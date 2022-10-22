import { createAction, props } from '@ngrx/store';
import { IDatabaseShelfSystem } from '../types';

export const setName = createAction('[ShelfSystem] Set Name', props<{ name: string }>());

export const newShelfSystem = createAction('[ShelfSystem] Set Name & Id', props<{ id: string, name: string }>())

export const loadShelfSystem = createAction('[ShelfSystem] Load System', props<{ id: string }>());

export const loadShelfSystemSuccess = createAction('[ShelfSystem] Load System into Store', props<{ system: IDatabaseShelfSystem }>());

export const setError = createAction('[ShelfSystem] Set Error and Message', props<{ error: boolean, message: string }>());

export const resetStore = createAction('[ShelfSystem] Reset State');

export const addShelf = createAction('[ShelfSystem] Add Another Shelf to System', props<{ add: "first" | "last" }>());

export const deleteShelf = createAction('[ShelfSystem] Delete Shelf from System', props<{ index: number }>());

export const addShelfBoard = createAction('[ShelfSystem] Add Board to Shelf System', props<{ shelfIndex: number, board: string }>());

export const deleteShelfBoard = createAction('[ShelfSystem] Delete Board from Shelf System', props<{ shelfIndex: number, boardIndex: number }>());