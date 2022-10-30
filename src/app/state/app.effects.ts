import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { catchError, map, of, switchMap, concatMap, tap } from 'rxjs';
import { HttpService } from '../services/http.service';
import * as ShelfActions from './app.actions';
import { IAppState } from './state.types';

@Injectable()
export class ShelfSystemEffects {
    constructor(private actions$: Actions, private store: Store<IAppState>, private http: HttpService, private router: Router) { }

    loadShelfSystem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShelfActions.loadShelfSystem),
            switchMap(({ id, shelfId, shelfIndex }) =>
                this.http.getShelfSystem(id).pipe(
                    map((val) => {
                        if (!val.result || !val.result.length) {
                            this.router.navigate(['/add']);
                            return ShelfActions.resetStore();
                        }
                        return ShelfActions.loadShelfSystemSuccess({ system: val.result[0], shelfId, shelfIndex });
                    }),
                    catchError(err => of(ShelfActions.setError({ error: true, message: err.message }))),
                )
            )
        )
    )

    saveShelfSystem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShelfActions.saveNewShelfSystem),
            concatMap(({ id, name }) => this.http.saveShelfSystem(id, name).pipe(
                map((result) => {
                    if (result.success) {
                        return ShelfActions.newShelfSystem({ id, name })
                    }
                    throw new Error("Error with backend");
                }),
                catchError(err => of(ShelfActions.setError({ error: true, message: "Could not save shelf!" }))),
            )),
        )
    )

    saveShelfSystemDB$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShelfActions.saveShelf),
            tap(() => this.store.dispatch(ShelfActions.isLoading())),
            concatLatestFrom(() => this.store.select("shelfSystem")),
            concatMap(([_, data]) => this.http.updateShelfSystem(data.systemId as string, data.systemName as string, data.system).pipe(
                map((result) => {
                    if (result.success) {
                        return ShelfActions.stopLoading();
                    }
                    throw new Error("Error with backend");
                }),
                catchError(err => of(ShelfActions.setError({ error: true, message: "Could not save shelfsystem!" }))),
            )),
        )
    )

    saveSingleShelf$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShelfActions.saveShelf),
            tap(() => this.store.dispatch(ShelfActions.isLoading())),
            concatMap(({ shelfId, systemId }) => this.http.saveShelf(shelfId, systemId).pipe(
                map((result) => {
                    if (result.success) {
                        return ShelfActions.addShelfToShelves({ shelfId });
                    }
                    throw new Error("Error with backend");
                }),
                catchError(err => of(ShelfActions.setError({ error: true, message: "Could not save shelf!" }))),
            ))
        )
    )

    saveBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShelfActions.saveBook),
            tap(() => this.store.dispatch(ShelfActions.isLoading())),
            concatMap(({ bookId, shelfId, author, title, shelfIndex }) => this.http.saveBook(bookId, shelfId, author, title, shelfIndex).pipe(
                map((result) => {
                    if (result.success) {
                        return ShelfActions.updateShelvesNewBook({ shelfId });
                    }
                    throw new Error("Error with backend");
                }),
                catchError(err => of(ShelfActions.setError({ error: true, message: "Could not save book!" }))),
            ))
        )
    )
}