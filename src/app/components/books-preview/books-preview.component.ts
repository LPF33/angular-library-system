import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map, catchError, of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IGetResultBook } from 'src/app/types';
import { IAppState } from 'src/app/state/state.types';
import { setError } from 'src/app/state/app.actions';

@Component({
  selector: 'app-books-preview',
  templateUrl: './books-preview.component.html',
  styleUrls: ['./books-preview.component.css']
})
export class BooksPreviewComponent implements OnChanges {

  @Input() bookIndex?: number;
  @Input() shelfId?: string;

  foundBook$: Observable<null | { title: string, author: string, created_at: string }> = of(null);

  constructor(private http: HttpService, private store: Store<IAppState>) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadBook();
  }

  loadBook() {
    this.foundBook$ = this.http.getBook(this.bookIndex as number, this.shelfId as string).pipe(
      map(response => {
        if (response.result && response.result.length) {
          return response.result;
        } else if (response.result) {
          throw new Error("Book not found in DB");
        }
        throw new Error("Server error");
      }),
      map(result => ({ title: result[0].title, author: result[0].author, created_at: result[0].created_at })),
      catchError(err => {
        this.store.dispatch(setError({ error: true, message: err.message }))
        return of(null);
      })
    )
  }

}
