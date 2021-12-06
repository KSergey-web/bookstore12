import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import validator from 'validator';
import { AbstractControl, NgForm, ValidatorFn } from '@angular/forms';

interface bookOptionalProperties {
  year?: number;
  rating?: number;
  isbn?: string;
}

@Component({
  selector: 'app-book-optional-properties',
  templateUrl: './book-optional-properties.component.html',
  styleUrls: ['./book-optional-properties.component.scss']
})
export class BookOptionalPropertiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.bookOptionalForm.controls.isbn.setValidators((control: AbstractControl): { [key: string]: any } | null => {
        return validator.isISBN(control.value ?? '')
          ? null : { wrongISBN: control.value };
      })
    }, 0);
  }

  @ViewChild('book_opt_form_tepm') bookOptionalForm!: NgForm;

  selectedRating = 0;
  hovered = 0;
  currentYear: number = new Date().getFullYear();


  isRatingCollapsed = true;
  isISBNCollapsed = true;
  isYearCollapsed = true;


  book: bookOptionalProperties = {
    rating: 0,
    isbn: '',
    year: 0,
  }

  isFormValid(): boolean {
    if (!this.isYearCollapsed) {
      if (this.bookOptionalForm.controls.year.invalid) return false;
    }
    if (!this.isISBNCollapsed) {
      if (this.bookOptionalForm.controls.isbn.invalid) return false;

    }
    return true;
  }

  getBookOptionalProperties(): bookOptionalProperties {
    let res: bookOptionalProperties = {};
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
