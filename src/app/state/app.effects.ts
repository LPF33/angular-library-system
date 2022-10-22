import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpStoreService } from '../services/http-store.service';
import { loadShelfSystem, loadShelfSystemSuccess, setError, resetStore } from './app.actions';

@Injectable()
export class ShelfSystemEffects {
    constructor(private actions$: Actions, private http: HttpStoreService, private router: Router) { }

    loadShelfSystem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadShelfSystem),
            switchMap(({ id }) =>
                this.http.getShelfSystem(id).pipe(
                    map((val) => {
                        if (!val.result || !val.result.length) {
                            this.router.navigate(['/add']);
                            return resetStore();
                        }
                        return loadShelfSystemSuccess({ system: val.result[0] });
                    }),
                    catchError(err => of(setError({ error: true, message: err.message }))),
                )
            )
        ))
}