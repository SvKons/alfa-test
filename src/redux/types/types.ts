import { initialBook } from '../../pages/CreateBook';

export interface IAuthor {
    name: string;
    birth_year?: number;
    death_year?: number;
}

export interface IBook {
    id: string;
    title: string;
    authors: IAuthor[];
    description: string;
    summaries: string[];
    imageUrl?: string;
    category: string;
    likeCount: number;
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    downloadCount: number;
    formats: {
        [key: string]: string;
    };
}

export interface BooksState {
    isLoading: boolean;
    books: IBook[];
    book: typeof initialBook;
    likedBooks: string[];
    filteredBooks: IBook[];
    showFavorites: boolean;
    selectedBook: IBook | null;
    status: 'idle' | 'loading' | 'failed';
}
