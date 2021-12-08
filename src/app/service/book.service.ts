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

  constructor(private firestore: AngularFirestore) {

  }

  getBooks(): Observable<Book[]> {
    return this.firestore.collection(this.nameCollection).valueChanges({ idField: 'id' }) as Observable<Book[]>;
  }

  async createBook(book: Book): Promise<Book> {
    const refBook = await this.firestore.collection<Book>(this.nameCollection).add(book);
    const res: Book | undefined = (await refBook.get()).data();
    if (!res) throw new Error('Сохраненный объект = undefined');
    return res;
  }
}
