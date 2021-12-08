import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { BookService } from '../services/book.service';
import { bookPropertiesEnum } from './book.enum';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {


  constructor(private bookService: BookService) { 
  }

  groupingBooks!: [string, [Book]][];


  ngOnInit(): void {
    this.bookService.booksObservable.subscribe(books => {
      this.updateGoodBook(books);
      this.updateBooks(books);
    })
  }


  updateBooks(books: Book[]){
    this.groupingBooks = Object.entries(this.groupBy(books, 'year'));
    this.groupingBooks.sort((group1, group2) => +group2[0] - +group1[0]);
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
    try{
    this.bookService.deleteBook(book);
    }
    catch (err) {
      alert('Не удалось удалить книгу');
      console.error(err);
    }
  }
}
