import { createAction, props } from '@ngrx/store';
import { IDatabaseShelfSystem } from '../types';

export const setName = createAction('[ShelfSystem] Set Name', props<{ name: string }>());

export const saveNewShelfSystem = createAction('[ShelfSystem] Save New Shelf in DB', props<{ id: string, name: string }>())

export const newShelfSystem = createAction('[ShelfSystem] Set Name & Id', props<{ id: string, name: string }>())

export const loadShelfSystem = createAction('[ShelfSystem] Load System', props<{ id: string, shelfId: string | null, shelfIndex: number | null }>());

export const loadShelfSystemSuccess = createAction('[ShelfSystem] Load System into Store', props<{ system: IDatabaseShelfSystem, shelfId: string | null, shelfIndex: number | null }>());

export const setError = createAction('[ShelfSystem] Set Error and Message', props<{ error: boolean, message: string }>());

export const clearError = createAction('[ShelfSystem] Clear Error');

export const resetStore = createAction('[ShelfSystem] Reset State');

export const addShelf = createAction('[ShelfSystem] Add Another Shelf to System', props<{ add: "first" | "last" }>());

export const deleteShelf = createAction('[ShelfSystem] Delete Shelf from System', props<{ index: number }>());

export const addShelfBoard = createAction('[ShelfSystem] Add Board to Shelf System', props<{ shelfIndex: number, board: string }>());

export const deleteShelfBoard = createAction('[ShelfSystem] Delete Board from Shelf System', props<{ shelfIndex: number, boardIndex: number }>());

export const saveShelfSystem = createAction('[ShelfSystem] Save ShelfSystem in DB');

export const saveShelf = createAction('[ShelfSystem] Save Shelf in DB', props<{ shelfId: string, systemId: string }>());

export const addShelfToShelves = createAction('[ShelfSystem] Add Shelf to Shelves in store', props<{ shelfId: string }>());

export const saveBook = createAction('[ShelfSystem] Save Book to DB', props<{ bookId: string, shelfId: string, author: string, title: string, shelfIndex: number }>());

export const updateShelvesNewBook = createAction('[ShelfSystem] New Book in shelf of shelves', props<{ shelfId: string }>());

export const isLoading = createAction('[ShelfSystem] Show Is Loading');

export const stopLoading = createAction('[ShelfSystem] Stop Loading');