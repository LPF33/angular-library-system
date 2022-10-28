import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Store } from '@ngrx/store';
import { map, catchError, of, Observable } from 'rxjs';
import { ISystem } from 'src/app/types';
import { IAppState } from 'src/app/state/state.types';
import { setError } from 'src/app/state/app.actions';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.css']
})
export class LibraryViewComponent {

  shelfsystems$: Observable<Omit<ISystem, "system">[]> = of([]);

  constructor(private http: HttpService, private store: Store<IAppState>) {
    this.getSystems();
  }

  getSystems() {
    this.shelfsystems$ = this.http.getShelfSystems().pipe(
      map(response => {
        if (response.result) {
          return response.result;
        }
        throw new Error("Server error");
      }),
      map(result => result.sort((a, b) => {
        let x = a.systemname.toLowerCase();
        let y = b.systemname.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      })),
      catchError(err => {
        this.store.dispatch(setError({ error: true, message: err.message }))
        return of([]);
      })
    )
  }
}
