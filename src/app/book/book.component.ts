import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../interfaces/book.interface';
import { NgForm } from '@angular/forms';
import { BookOptionalPropertiesComponent } from '../book-optional-properties/book-optional-properties.component';
import { BookService } from '../services/book.service';

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

  @Input() authors: Array<string> = [];

  @Input() initBook: Book = {
    name: '',
    authors: [],
  };

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

  deleteAuthor(ind: number): void {
    this.authors.splice(ind, 1);
  }

  getFinishedBook(bookForm: NgForm): Book {
    this.bookOptionalPropertiesComponent?.getBookOptionalProperties();
    const bookName = (bookForm.controls.bookName.value as string)
      .trim()
      .replace(/ +/g, ' ');
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

  addAuthor(author: string): void {
    if (!this.authors.includes(author)) this.authors.push(author);
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
