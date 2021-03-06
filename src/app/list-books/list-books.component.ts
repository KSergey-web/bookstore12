import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from '../book/book.component';
import { Book } from '../interfaces/book.interface';
import { BookService } from '../services/book.service';
import { bookPropertiesEnum } from './book.enum';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) {}

  groupedBooks!: [string, [Book]][];
  groupMode: string = 'year';
  books: Book[] = [];

  goodBook?: Book | null;

  private today = new Date().getFullYear();

  ngOnInit(): void {
    this.bookService.booksObservable.subscribe((books) => {
      this.books = books;
      this.updateGoodBook(books);
      this.updateBooks(this.groupMode);
    });
  }

  private fnForGroupingByAuthors(book: Book): string[] {
    return book.authors.sort((author1: string, author2: string) =>
      author1.localeCompare(author2)
    );
  }

  updateBooks(groupMode: string = 'year'): void {
    if (groupMode === bookPropertiesEnum.authors) {
      this.groupedBooks = Object.entries(
        this.groupBy(this.books, this.fnForGroupingByAuthors)
      );
    } else {
      this.groupedBooks = Object.entries(this.groupBy(this.books, groupMode));
    }
    this.groupedBooks.sort(([group1], [group2]) =>
      !isNaN(+group2) ? +group2 - +group1 : group1.localeCompare(group2)
    );
    this.groupedBooks.forEach(([, books]) => {
      books.sort(({ name: n1 }, { name: n2 }) => n1.localeCompare(n2));
    });
  }

  updateGoodBook(books: Book[]): void {
    this.goodBook = null;
    books = books.filter(({ year, rating }) => {
      const old3year: boolean = year ? this.today - year >= 3 : false;
      const hasRating: boolean = typeof rating === 'number' ? true : false;
      return old3year && hasRating;
    });
    if (books.length === 0) return;
    books.sort(({ rating: r1 }, { rating: r2 }) => r2! - r1!);
    const highestRating = books[0].rating!;
    books = books.filter(({ rating }) => rating! === highestRating);
    if (books.length === 1) {
      this.goodBook = books[0];
      return;
    }
    const randomNumber: number = Math.floor(Math.random() * books.length);
    this.goodBook = books[randomNumber];
  }

  private groupBy(arr: any, fn: any): { [s: string]: [any] } {
    return arr
      .map(typeof fn === 'function' ? fn : (val: any) => val[fn])
      .reduce((acc: any, val: any, i: any) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
      }, {});
  }

  async deleteBook(book: Book): Promise<void> {
    try {
      this.bookService.deleteBook(book);
    } catch (err) {
      alert('???? ?????????????? ?????????????? ??????????');
      console.error(err);
    }
  }

  changeGrouping(newMode: string): void {
    if (newMode == this.groupMode) return;
    this.groupMode = newMode;
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

  openBookModal() {
    this.modalService.open(BookComponent);
  }

  editBook(book: Book): void {
    const modalRef = this.modalService.open(BookComponent);
    (modalRef.componentInstance as BookComponent).initBook = book;
  }

  isNumber(number: any): boolean {
    return typeof number === 'number';
  }

  modeForNgModel: string = 'year';
}
