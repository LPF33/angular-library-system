import { IShelves } from "../types";

export interface IStateShelfSystem {
    systemId: string | null;
    systemName: string | null;
    system: string[][];
    newSystem: boolean;
    shelves: IShelves[] | null;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
    foundShelfId: string | null;
    foundShelfIndex: number | null;
}

export interface IAppState {
    shelfSystem: IStateShelfSystem;
}