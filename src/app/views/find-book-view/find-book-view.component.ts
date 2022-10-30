import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Store } from '@ngrx/store';
import { ISearchBooks } from 'src/app/types';
import { IAppState } from 'src/app/state/state.types';
import { map, catchError, of, Observable, debounceTime, filter, switchMap } from 'rxjs';
import { setError } from 'src/app/state/app.actions';

@Component({
  selector: 'app-find-book-view',
  templateUrl: './find-book-view.component.html',
  styleUrls: ['./find-book-view.component.css']
})
export class FindBookViewComponent implements OnInit {

  foundBooks$: Observable<null | ISearchBooks[]> = of(null);
  search = new FormControl('');

  constructor(private http: HttpService, private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.foundBooks$ = this.search.valueChanges.pipe(
      debounceTime(300),
      filter(input => input !== ""),
      switchMap(input => this.http.searchBook(input as string).pipe(
        map(response => {
          if (response.result) {
            return response.result;
          }
          throw new Error("Server error");
        }),
        catchError(err => {
          this.store.dispatch(setError({ error: true, message: err.message }))
          return of(null);
        }))
      )
    )
  }
}
