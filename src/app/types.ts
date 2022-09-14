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

export interface IGetResultShelfSystem {
    result: {
        id: number;
        system: string[][];
        systemid: string;
        systemname: string;
        created_at: string;
    }[];
}

export interface IGetResultShelf {
    result: {
        id: number;
        books: string[];
        shelfid: string;
        systemid: string;
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