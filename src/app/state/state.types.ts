export interface IStateShelfSystem {
    systemId: string | null;
    systemName: string | null;
    system: string[][];
    newSystem: boolean;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}