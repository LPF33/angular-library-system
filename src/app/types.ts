export interface IBook {
    bookId: string;
    title: string;
    author: string;
}

export interface ISystem {
    systemid: string;
    systemname: string;
    system: string[];
}

export interface IResultLibrary {
    result: Omit<ISystem, "system">[];
}

export interface IResultShelfSystem {
    result: {
        id: number;
        system: string[][];
        systemid: string;
        systemname: string;
        created_at: string;
    }[];
}