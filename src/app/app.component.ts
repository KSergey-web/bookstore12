import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from './book/book.component';
import { Book } from './interfaces/book.interface';
import { books } from './books';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {
  }

  closeResult = '';
  books = books;

  open() {
    this.modalService.open(BookComponent).result.then((book) => {
      this.books.push(book);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  isLastAuthor(index: number, authors: Array<string>): boolean{
    if (authors.length-1 === index) return true;
    return false;
  }
}
