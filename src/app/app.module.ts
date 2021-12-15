import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from './book/book.component';
import { BookOptionalPropertiesComponent } from './book-optional-properties/book-optional-properties.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { environment } from 'src/environments/environment';
import { BookService } from './services/book.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthorComponent } from './author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookOptionalPropertiesComponent,
    ListBooksComponent,
    AuthorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
