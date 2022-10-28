// General
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { shelfSystemReducer } from './state/app.reducer';
import { ShelfSystemEffects } from './state/app.effects';

// Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

// Directives
import { LoopTimesDirective } from './directives/loop-times.directive';
import { HoverDirective } from './directives/hover.directive';

// Views
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ShelfSystemViewComponent } from './views/shelfsystem-view/shelf.component';
import { FindBookViewComponent } from './views/find-book-view/find-book-view.component';
import { LibraryViewComponent } from './views/library-view/library-view.component';

// Components
import { AppComponent } from './app.component';
import { ShelfBoardComponent } from './components/shelf-board/shelf-board.component';
import { ShelfEmptyComponent } from './components/shelf-empty/shelf-empty.component';
import { ShelfEditBoardComponent } from './components/shelf-edit-board/shelf-edit-board.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BooksPreviewComponent } from './components/books-preview/books-preview.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfSystemViewComponent,
    ShelfBoardComponent,
    ShelfEmptyComponent,
    ShelfEditBoardComponent,
    AddBookComponent,
    LoopTimesDirective,
    NavigationComponent,
    FindBookViewComponent,
    HomeViewComponent,
    HoverDirective,
    LibraryViewComponent,
    BooksPreviewComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    StoreModule.forRoot({ shelfSystem: shelfSystemReducer }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ShelfSystemEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
