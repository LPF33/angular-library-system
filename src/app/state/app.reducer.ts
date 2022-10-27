import { createReducer, on } from '@ngrx/store';
import { IStateShelfSystem } from './state.types';
import * as ShelfSystemActions from './app.actions';
import { IShelves } from '../types';

export const initialState: IStateShelfSystem = {
    systemId: null,
    systemName: null,
    system: [],
    newSystem: false,
    shelves: null,
    loading: false,
    error: false,
    errorMessage: null,
    foundShelfId: null,
    foundShelfIndex: null,
};

export const shelfSystemReducer = createReducer(
    initialState,
    on(ShelfSystemActions.setName, (state, { name }) => ({ ...state, systemName: name })),
    on(ShelfSystemActions.newShelfSystem, (state, { id, name }) => ({ ...initialState, systemId: id, systemName: name, system: [[]], newSystem: true })),
    on(ShelfSystemActions.loadShelfSystemSuccess, (state, { system, shelfId, shelfIndex }) => ({ ...initialState, systemId: system.systemid, systemName: system.systemname, system: system.system, shelves: system.shelves, foundShelfId: shelfId, foundShelfIndex: shelfIndex })),
    on(ShelfSystemActions.resetStore, () => JSON.parse(JSON.stringify(initialState))),
    on(ShelfSystemActions.addShelf, (state, { add }) => {
        const system = JSON.parse(JSON.stringify(state.system));
        add === 'first' ? system.unshift([]) : system.push([]);
        return { ...state, system };
    }),
    on(ShelfSystemActions.deleteShelf, (state, { index }) => {
        const system = JSON.parse(JSON.stringify(state.system));
        system.splice(index, 1);
        return { ...state, system };
    }),
    on(ShelfSystemActions.addShelfBoard, (state, { shelfIndex, board }) => {
        const system = JSON.parse(JSON.stringify(state.system));
        system[shelfIndex].unshift(board);
        return { ...state, system };
    }),
    on(ShelfSystemActions.deleteShelfBoard, (state, { shelfIndex, boardIndex }) => {
        const system = JSON.parse(JSON.stringify(state.system));
        system[shelfIndex].splice(boardIndex, 1);
        return { ...state, system };
    }),
    on(ShelfSystemActions.addShelfToShelves, (state, { shelfId }) => {
        const shelves = JSON.parse(JSON.stringify(state.shelves));
        shelves.push({ shelfid: shelfId, books: 0 });
        return { ...state, shelves };
    }),
    on(ShelfSystemActions.updateShelvesNewBook, (state, { shelfId }) => {
        let shelves = JSON.parse(JSON.stringify(state.shelves)) as IShelves[];
        shelves = shelves.map(item => {
            if (item.shelfid === shelfId) {
                item.books++;
                return item;
            }
            return item;
        })
        return { ...state, shelves };
    }),
    on(ShelfSystemActions.setError, (state, { error, message }) => ({ ...state, error: true, errorMessage: message, loading: false })),
    on(ShelfSystemActions.isLoading, (state) => ({ ...state, loading: true })),
    on(ShelfSystemActions.stopLoading, (state) => ({ ...state, loading: false }))
);