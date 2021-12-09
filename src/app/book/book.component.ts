import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../interfaces/book.interface';
import validator from 'validator';
import { NgForm } from '@angular/forms';
import { BookOptionalPropertiesComponent } from '../book-optional-properties/book-optional-properties.component';
import { BookService } from '../services/book.service';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @ViewChild(BookOptionalPropertiesComponent, { static: false })
  private bookOptionalPropertiesComponent:
    | BookOptionalPropertiesComponent
    | undefined;

  @ViewChild('bookForm') bookForm!: NgForm;

  author?: string;

  editingAuthor: string = '';

  editingAuthorInd: number = -1;

  @Input() authors: Array<string> = [];

  @Input() initBook: Book = {
    name: '',
    authors: [],
  };

  isAuthorCollapsed = true;

  constructor(
    private activeModal: NgbActiveModal,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    if (this.initBook.id) {
      this.authors = this.initBook.authors.slice();
    }
    setTimeout(() => {
      this.bookForm.controls.bookName.setValue(this.initBook.name);
    }, 0);
  }

  dismissEditedAuthor() {
    this.editingAuthorInd = -1;
  }

  editAuthor(author: string, ind: number): void {
    this.editingAuthor = author;
    this.editingAuthorInd = ind;
  }

  deleteAuthor(ind: number): void {
    this.authors.splice(ind, 1);
  }

  saveAuthor(ind: number): void {
    let author = this.editingAuthor;
    author = this.clearSpaces(author);
    this.editingAuthorInd = -1;
    if (!author) {
      this.deleteAuthor(ind);
      return;
    }
    this.authors[ind] = author;
  }

  getFinishedBook(bookForm: NgForm): Book {
    this.bookOptionalPropertiesComponent?.getBookOptionalProperties();
    const bookName = this.clearSpaces(
      bookForm.controls.bookName.value as string
    );
    const book: Book = {
      name: bookName,
      authors: this.authors,
      ...this.bookOptionalPropertiesComponent?.getBookOptionalProperties(),
    };
    if (this.initBook.id) book.id = this.initBook.id;
    return book;
  }

  async saveBook(bookForm: NgForm): Promise<void> {
    const book = this.getFinishedBook(bookForm);
    try {
      if (this.initBook.id) await this.bookService.updateBook(book);
      else await this.bookService.createBook(book);
      this.activeModal.close('Success');
    } catch (err) {
      console.error(err);
      alert('Не удалось сохранить книгу');
    }
  }

  addAuthor(): void {
    let author = this.clearSpaces(this.author ?? '');
    if (!author) return;
    this.authors.push(author);
    this.author = '';
    this.isAuthorCollapsed = true;
  }

  clearSpaces(str: string): string {
    str = str.trim();
    str = str.replace(/ +/g, ' ');
    return str;
  }
}
