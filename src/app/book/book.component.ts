import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../interfaces/book.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  
  name!: string;
  authors: Array<string> = [];
  year?: Date;
  rating?: number;
  isbn?: string;
  
  constructor(
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }

  saveBook() {
    alert(`${this.name}, ${this.authors}`)
    let book: Book = {
      name: this.name,
      authors: this.authors,
    }
    if (this.year && this.year.getFullYear() > 1800) book.year = this.year;
    if (this.isbn) book.isbn = this.isbn;
    if (this.rating) book.rating = this.rating;
    this.activeModal.close(book)
  }

  editAuthor(author: string, ind: number){
    let result = prompt('Автор: ', author);
    if ( result === null) return;
    author = result;
    if (!(author && author.trim())) {
      this.authors.splice(ind,1);
      return;
    }
    this.authors[ind] = author;
  }

  newAuthor(){
    let author = prompt('Введите имя автора: ', '');
    if (!(author && author.trim())) return;
    this.authors.push(author);
  }

  isLastAuthor(index: number, authors: Array<string>): boolean{
    if (authors.length-1 === index) return true;
    return false;
  }
}
