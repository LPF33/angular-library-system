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

export interface IShelves {
    shelfid: string;
    books: number;
}

export interface IResultLibrary {
    result: Omit<ISystem, "system">[];
}
export interface IDatabaseShelfSystem {
    id: number;
    systemid: string;
    systemname: string;
    system: string[][];
    shelves: IShelves[] | null;
    created_at: string;
}

export interface IGetResultShelfSystem {
    result: IDatabaseShelfSystem[];
}

export interface IGetResultShelf {
    result: {
        id: number;
        books: string[];
        shelfid: string;
        systemid: string;
        shelves: IShelves[] | null;
        created_at: string;
    }[];
}

export interface IGetResultBook {
    result: {
        author: string;
        bookid: string;
        created_at: string;
        description: string;
        id: number
        shelfid: string;
        title: string;
    }[];
}

export interface IPutPostDeleteResult {
    success: boolean;
}

export interface IPostShelfSystem {
    success: boolean;
    result?: IDatabaseShelfSystem;
}