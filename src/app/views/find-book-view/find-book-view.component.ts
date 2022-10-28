import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Store } from '@ngrx/store';
import { ISearchBooks } from 'src/app/types';
import { IAppState } from 'src/app/state/state.types';
import { map, catchError, of, Observable } from 'rxjs';
import { setError } from 'src/app/state/app.actions';

@Component({
  selector: 'app-find-book-view',
  templateUrl: './find-book-view.component.html',
  styleUrls: ['./find-book-view.component.css']
})
export class FindBookViewComponent implements OnInit {

  search: string = "";
  foundBooks$: Observable<null | ISearchBooks[]> = of(null);

  constructor(private http: HttpService, private store: Store<IAppState>) { }

  ngOnInit(): void {
  }

  inputChange(event: Event) {
    if ((event.target as HTMLInputElement)?.value) {
      this.foundBooks$ = this.http.searchBook((event.target as HTMLInputElement).value).pipe(
        map(response => {
          if (response.result) {
            return response.result;
          }
          throw new Error("Server error");
        }),
        catchError(err => {
          this.store.dispatch(setError({ error: true, message: err.message }))
          return of(null);
        })
      )
    }
  }

}
