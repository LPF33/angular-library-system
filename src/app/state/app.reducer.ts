import { createReducer, on } from '@ngrx/store';
import { IStateShelfSystem } from './state.types';
import * as ShelfSystemActions from './app.actions';

export const initialState: IStateShelfSystem = {
    systemId: null,
    systemName: null,
    system: [],
    newSystem: false,
    loading: false,
    error: false,
    errorMessage: null,
};

export const shelfSystemReducer = createReducer(
    initialState,
    on(ShelfSystemActions.setName, (state, { name }) => ({ ...state, systemName: name })),
    on(ShelfSystemActions.newShelfSystem, (state, { id, name }) => ({ ...initialState, systemId: id, systemName: name, system: [[]], newSystem: true })),
    on(ShelfSystemActions.loadShelfSystemSuccess, (state, { system }) => ({ ...initialState, systemId: system.systemid, systemName: system.systemname, system: system.system })),
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
    })
);