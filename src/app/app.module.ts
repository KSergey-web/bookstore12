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
import { environment } from 'src/environments/environment';
import { BookService } from './service/book.service';
import { AngularFireModule } from '@angular/fire/compat';



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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
