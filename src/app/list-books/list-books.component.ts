import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { bookPropertiesEnum } from './book.enum';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {


  constructor() { }

  @Input() books: Array<Book> = [];
  groupingBooks!: [string, [Book]][];


  ngOnInit(): void {
    this.updateBooks();
  }


  updateBooks(){
    this.groupingBooks = Object.entries(this.groupBy(this.books, 'year'));
    this.groupingBooks.sort((group1, group2) => +group2[0] - +group1[0]);
    this.groupingBooks.forEach(group => {
      group[1].sort(({ name: str1 }, { name: str2 }) => str1.localeCompare(str2))
    })
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
}
