import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Book } from '../interfaces/book.interface';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  get nameCollection(): string { 
    return 'Books';
  }

  private _bookObs: Observable<Book[]>

  constructor(private firestore: AngularFirestore) {
    this._bookObs = this.booksObs();
  }

  private booksObs(): Observable<Book[]> {
    return this.firestore.collection(this.nameCollection).valueChanges({ idField: 'id' }) as Observable<Book[]>;
  }

  async createBook(book: Book): Promise<DocumentReference<Book>> {
    return await this.firestore.collection<Book>(this.nameCollection).add(book);
  }

  async deleteBook(book: Book): Promise<void> {
    return await this.firestore.collection(this.nameCollection).doc(book.id!).delete();
  }

  get booksObservable(): Observable<Book[]> {
    return this._bookObs;
  }

  async updateBook(book: Book): Promise<void>{
    return await this.firestore.collection(this.nameCollection).doc(book.id!).set(book);
  }
}
