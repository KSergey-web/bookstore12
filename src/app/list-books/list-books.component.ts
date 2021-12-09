import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from '../book/book.component';
import { Book } from '../interfaces/book.interface';
import { BookService } from '../services/book.service';
import { bookPropertiesEnum } from './book.enum';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {


  constructor(
    private bookService: BookService,
    private modalService: NgbModal,
    ) {
  }

  groupingBooks!: [string, [Book]][];
  groupMode: string = 'year';
  books: Book[] = [];

  ngOnInit(): void {
    this.bookService.booksObservable.subscribe(books => {
      this.books = books;
      this.updateGoodBook(books);
      this.updateBooks(this.groupMode);
    })
  }

  
  fnForGroupingByAuthors(book: Book) {
    return book.authors.sort((a1: string, a2: string) => a1.localeCompare(a2))
  }

  updateBooks(groupMode: string = 'year') {
    if (groupMode === bookPropertiesEnum.authors) 
      this.groupingBooks = Object.entries(this.groupBy(this.books, this.fnForGroupingByAuthors));
    else 
      this.groupingBooks = Object.entries(this.groupBy(this.books, groupMode));
    this.groupingBooks.sort(([g1], [g2]) => !isNaN( +g2 ) ? (+g2 - +g1) : g1.localeCompare(g2));
    this.groupingBooks.forEach(group => {
      group[1].sort(({ name: str1 }, { name: str2 }) => str1.localeCompare(str2))
    })
  }

  goodBook?: Book | null;

  updateGoodBook(books: Book[]) {
    this.goodBook = null;
    const today = new Date().getFullYear();
    books = books.filter(({ year }) => year ? ((today - year) >= 3) : false);
    books = books.filter(({ rating }) => typeof rating === 'number' ? true : false);
    if (books.length === 0) return;
    books.sort(({ rating: r1 }, { rating: r2 }) => r2! - r1!);
    const highestRating = books[0].rating!;
    books = books.filter(({ rating }) => rating! === highestRating);
    if (books.length === 1) {
      this.goodBook = books[0];
      return;
    }
    const randomNumber: number = Math.floor(Math.random() * (books.length));
    this.goodBook = books[randomNumber];
  }

  groupBy(arr: any, fn: any) {
    return arr
      .map(typeof fn === 'function' ? fn : (val: any) => val[fn])
      .reduce((acc: any, val: any, i: any) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
      }, {});
  }

  isLastAuthor(index: number, authors: Array<string>): boolean {
    if (authors.length - 1 === index) return true;
    return false;
  }

  async deleteBook(book: Book): Promise<void> {
    try {
      this.bookService.deleteBook(book);
    }
    catch (err) {
      alert('Не удалось удалить книгу');
      console.error(err);
    }
  }

  mode: string = 'year';

  changeGroping(newMode: string): void {
    if (newMode == this.groupMode) return;
    this.groupMode = newMode
    switch (this.groupMode) {
      case bookPropertiesEnum.year:
        this.updateBooks(bookPropertiesEnum.year);
        break;
      case bookPropertiesEnum.rating:
        this.updateBooks(bookPropertiesEnum.rating);
        break;
      case bookPropertiesEnum.authors:
        this.updateBooks(bookPropertiesEnum.authors);
        break;
    }
  }

  editBook(book: Book): void {
    const modalRef = this.modalService.open(BookComponent);
    (modalRef.componentInstance as BookComponent).initBook = book;
  }

}
