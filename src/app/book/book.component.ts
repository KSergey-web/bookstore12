import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../interfaces/book.interface';
import validator from 'validator';
import { NgForm} from '@angular/forms';
import { BookOptionalPropertiesComponent } from '../book-optional-properties/book-optional-properties.component';


const groupBy = (arr: any, fn: any) =>
  arr
    .map(typeof fn === 'function' ? fn : (val: any) => val[fn])
    .reduce((acc: any, val: any, i: any) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

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
  


  saveBook(myForm: NgForm) {
    this.bookOptionalPropertiesComponent?.getBookOptionalProperties();
    let book: Book = {
      name: myForm.controls.bookName.value,
      authors: this.authors,
      ...this.bookOptionalPropertiesComponent?.getBookOptionalProperties()
    }
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

  addAuthor(){
    if (!(this.author && this.author.trim())) return;
    this.authors.push(this.author);
  }

  isLastAuthor(index: number): boolean{
    if (this.authors.length-1 === index) return true;
    return false;
  }
}
