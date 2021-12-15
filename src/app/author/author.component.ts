import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  constructor() {}

  @Output() newAuthor = new EventEmitter<string>();
  isAuthorCollapsed = true;

  ngOnInit(): void {}

  addAuthor(authorForm: NgForm): void {
    const fullname: string =
      authorForm.controls.name.value + ' ' + authorForm.controls.surname.value;
    this.newAuthor.emit(fullname);
    authorForm.controls.name.setValue('');
    authorForm.controls.surname.setValue('');
    this.isAuthorCollapsed = true;
  }
}
