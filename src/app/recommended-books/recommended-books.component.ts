import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book.interface';

@Component({
  selector: 'app-recommended-books',
  templateUrl: './recommended-books.component.html',
  styleUrls: ['./recommended-books.component.scss']
})
export class RecommendedBooksComponent implements OnInit {


  constructor() { }

  @Input() books: Array<Book> = [];
  goodBooks!: Array<Book>;


  ngOnInit(): void {
    this.updateGoodBooks();
  }

  updateGoodBooks() {
    const today = new Date().getFullYear();
    this.goodBooks = this.books.filter(({ year }) => year ? ((today - year) >= 3) : false);
    this.goodBooks = this.books.filter(({ rating }) => typeof rating === 'number' ? true : false);
    this.goodBooks.sort(({ rating: r1 }, { rating: r2 }) => r2! - r1!);
    const averageRating = this.goodBooks.reduce((acc: number, { rating }) => acc + rating!, 0) / this.goodBooks.length;
    this.goodBooks = this.goodBooks.filter(({ rating }) => rating! > averageRating);
    this.goodBooks = this.goodBooks.filter(() => Math.round((Math.random())) ? true : false);
  }


  isLastAuthor(index: number, authors: Array<string>): boolean {
    if (authors.length - 1 === index) return true;
    return false;
  }
}
