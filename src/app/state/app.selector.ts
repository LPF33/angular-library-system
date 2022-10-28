import { createSelector } from '@ngrx/store';
import { IAppState } from './state.types';

export const selectShelfSystem = (state: IAppState) => state.shelfSystem;

export const selectSystemId = createSelector(selectShelfSystem, ({ systemId }) => systemId);

export const selectNewSystem = createSelector(selectShelfSystem, ({ newSystem }) => newSystem);

export const selectShelfBooks = createSelector(selectShelfSystem, ({ shelves }) => shelves);

export const selectFoundShelfIdIndex = createSelector(selectShelfSystem, ({ foundShelfId, foundShelfIndex }) => ({ foundShelfId, foundShelfIndex }));

export const getError = createSelector(selectShelfSystem, ({ error, errorMessage }) => ({ error, errorMessage }));