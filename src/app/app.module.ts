import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from './book/book.component';
import { BookOptionalPropertiesComponent } from './book-optional-properties/book-optional-properties.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { RecommendedBooksComponent } from './recommended-books/recommended-books.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookOptionalPropertiesComponent,
    ListBooksComponent,
    RecommendedBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
