import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialBook } from '../../pages/CreateBook';
import { BooksState, IBook } from '../types/types';

const initialState: BooksState = {
    isLoading: false,
    books: [],
    book: initialBook,
    likedBooks: [],
    filteredBooks: [],
    showFavorites: false,
    selectedBook: null,
    status: 'idle',
};

export const getBooks = createAsyncThunk<IBook[]>('books/getBooks', async () => {
    const response = await fetch('https://gutendex.com/books/');
    const data = await response.json();
    return data.results || [];
});

export const getBookById = createAsyncThunk('books/getBookById', async (bookId: string) => {
    const response = await fetch(`https://gutendex.com/books/${bookId}/`);
    const data = await response.json();
    return data;
});

export const likeBook = createAsyncThunk<IBook, string>('books/likeBook', async (bookId: string) => {
    const response = await axios.patch(`https://gutendex.com/books/${bookId}/like`);
    return response.data;
});

export const dislikeBook = createAsyncThunk<IBook, string>('books/dislikeBook', async (bookId: string) => {
    const response = await axios.patch(`https://gutendex.com/books/${bookId}/dislike`);
    return response.data;
});

export const deleteBook = createAsyncThunk<string, string>('books/deleteBook', async (bookId: string) => {
    await axios.delete(`https://gutendex.com/books/${bookId}`);
    return bookId;
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<IBook>) => {
            state.books.push(action.payload);
            state.filteredBooks.push(action.payload);
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const bookId = action.payload;
            if (state.likedBooks.includes(bookId)) {
                state.likedBooks = state.likedBooks.filter(id => id !== bookId);
            } else {
                state.likedBooks.push(bookId);
            }
            if (state.showFavorites) {
                state.filteredBooks = state.books.filter(book => state.likedBooks.includes(book.id));
            }
        },
        toggleFavoritesFilter: state => {
            state.showFavorites = !state.showFavorites;
            if (state.showFavorites) {
                state.filteredBooks = state.books.filter(book => state.likedBooks.includes(book.id));
            } else {
                state.filteredBooks = state.books;
            }
        },
        deleteBookLocally(state, action: PayloadAction<string>) {
            const deletedBookId = action.payload;
            state.books = state.books.filter(book => book.id !== deletedBookId);
            state.filteredBooks = state.filteredBooks.filter(book => book.id !== deletedBookId);
        },
        setBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books = action.payload;
            state.filteredBooks = action.payload;
        },
        addBookLocally: (state, action: PayloadAction<IBook>) => {
            state.books.push(action.payload);
            state.filteredBooks.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getBooks.pending, state => {
                state.isLoading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
                state.filteredBooks = action.payload;
            })
            .addCase(getBooks.rejected, state => {
                state.isLoading = false;
            })
            .addCase(getBookById.pending, state => {
                state.isLoading = true;
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedBook = action.payload;
            })
            .addCase(getBookById.rejected, state => {
                state.isLoading = false;
            })
            .addCase(likeBook.fulfilled, (state, action) => {
                const updatedBook = action.payload;
                state.books = state.books.map(book => (book.id === updatedBook.id ? updatedBook : book));
                if (state.showFavorites) {
                    state.filteredBooks = state.books.filter(book => state.likedBooks.includes(book.id));
                }
            })
            .addCase(dislikeBook.fulfilled, (state, action) => {
                const updatedBook = action.payload;
                state.books = state.books.map(book => (book.id === updatedBook.id ? updatedBook : book));
                if (state.showFavorites) {
                    state.filteredBooks = state.books.filter(book => state.likedBooks.includes(book.id));
                }
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                const deletedBookId = action.payload;
                state.books = state.books.filter(book => book.id !== deletedBookId);
                state.filteredBooks = state.filteredBooks.filter(book => book.id !== deletedBookId);
            });
    },
});

export const { toggleLike, toggleFavoritesFilter, setBooks, addBookLocally } = booksSlice.actions;

export default booksSlice.reducer;
