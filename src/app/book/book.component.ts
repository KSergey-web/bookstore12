import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../interfaces/book.interface';
import validator from 'validator';
import { NgForm} from '@angular/forms';
import { BookOptionalPropertiesComponent } from '../book-optional-properties/book-optional-properties.component';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  
  @ViewChild(BookOptionalPropertiesComponent, {static: false})
  private bookOptionalPropertiesComponent: BookOptionalPropertiesComponent | undefined;

  author?: string;


  authors: Array<string> = [];

  isAuthorCollapsed = true;

  
  constructor(
    public activeModal: NgbActiveModal,
    ) { 
    }

  ngOnInit(): void {
  }
  


  saveBook(myForm: NgForm): void {
    this.bookOptionalPropertiesComponent?.getBookOptionalProperties();
    const bookName = this.clearSpaces((myForm.controls.bookName.value as string));
    const book: Book = {
      name: bookName,
      authors: this.authors,
      ...this.bookOptionalPropertiesComponent?.getBookOptionalProperties()
    }
    this.activeModal.close(book)
  }

  editAuthor(author: string, ind: number): void {
    let result = prompt('Автор: ', author);
    if ( result === null) return;
    author = this.clearSpaces(result);
    if (!author) {
      this.authors.splice(ind,1);
      return;
    }
    this.authors[ind] = author;
  }

  addAuthor(): void {
    let author = this.clearSpaces(this.author ?? '')
    if (!author) return;
    this.authors.push(author);
  }

  clearSpaces(str: string): string {
    str = str.trim();
    str = str.replace(/ +/g, ' ');
    return str;
  }
}
