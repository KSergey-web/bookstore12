import { Component, Input, OnInit, ViewChild } from '@angular/core';
import validator from 'validator';
import { AbstractControl, NgForm } from '@angular/forms';
import { Book } from '../interfaces/book.interface';
import { BookOptionalProperties } from '../interfaces/book-optional-properties.interface';

@Component({
  selector: 'app-book-optional-properties',
  templateUrl: './book-optional-properties.component.html',
  styleUrls: ['./book-optional-properties.component.scss'],
})
export class BookOptionalPropertiesComponent implements OnInit {
  constructor() {}

  @ViewChild('book_opt_form_tepm') bookOptionalForm!: NgForm;

  @Input() initBook!: Book;

  selectedRating = 0;
  hovered = 0;
  currentYear: number = new Date().getFullYear();

  isRatingCollapsed = true;
  isISBNCollapsed = true;
  isYearCollapsed = true;

  ngOnInit() {
    setTimeout(() => {
      this.setISBNValidation();
      this.setInitBook();
    }, 0);
    this.setCollases();
  }

  private setISBNValidation(): void {
    this.bookOptionalForm.controls.isbn.setValidators(
      (control: AbstractControl): { [key: string]: any } | null => {
        return validator.isISBN(control.value ?? '')
          ? null
          : { wrongISBN: control.value };
      }
    );
  }

  private setInitBook(): void {
    this.bookOptionalForm.controls.isbn.setValue(this.initBook.isbn ?? '');
    this.bookOptionalForm.controls.year.setValue(this.initBook.year ?? 0);
    this.selectedRating = this.initBook.rating ?? 0;
  }

  private setCollases(): void {
    this.isRatingCollapsed = !(
      this.initBook.rating || this.initBook.rating === 0
    );
    this.isYearCollapsed = !this.initBook.year;
    this.isISBNCollapsed = !this.initBook.isbn;
  }

  isFormValid(): boolean {
    if (!this.isYearCollapsed) {
      if (this.bookOptionalForm?.controls?.year?.invalid) return false;
    }
    if (!this.isISBNCollapsed) {
      if (this.bookOptionalForm?.controls?.isbn?.invalid) return false;
    }
    return true;
  }

  getBookOptionalProperties(): BookOptionalProperties {
    let res: BookOptionalProperties = {};
    if (!this.isYearCollapsed) {
      res.year = this.bookOptionalForm.controls.year.value;
    }
    if (!this.isISBNCollapsed) {
      res.isbn = this.bookOptionalForm.controls.isbn.value;
    }
    if (!this.isRatingCollapsed) {
      res.rating = this.selectedRating;
    }
    return res;
  }
}
