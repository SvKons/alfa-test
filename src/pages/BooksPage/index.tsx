import { useEffect, useState } from 'react';
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getBooks, toggleFavoritesFilter, toggleLike } from '../../redux/Books/bookslice';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import HeadingTitle from '../../components/HeadingTitle';
import Pagination from '../../components/Pagination';
import { IBook } from '../../redux/types/types';

const BooksPage = () => {
    const { isLoading, likedBooks, showFavorites } = useSelector((state: RootState) => state.books);
    const filteredBooks = useSelector((state: RootState) => state.books.filteredBooks);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 7;

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    if (!Array.isArray(filteredBooks)) {
        console.error('filteredBooks is not an array', filteredBooks);
        return <div>Error: Books data is not an array.</div>;
    }

    const handleLikeClick = (bookId: IBook['id']) => {
        dispatch(toggleLike(bookId));
    };

    const handleDeleteClick = (bookId: IBook['id']) => {
        dispatch({ type: 'books/deleteBookLocally', payload: bookId });
        console.log('Удаление книги:', bookId);
    };

    const handleShowAllClick = () => {
        if (showFavorites) {
            dispatch(toggleFavoritesFilter());
        }
    };

    const handleShowFavoritesClick = () => {
        if (!showFavorites) {
            dispatch(toggleFavoritesFilter());
        }
    };

    const handleCardClick = (bookId: string) => {
        navigate(`/books/${bookId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    if (isLoading) return <Loader />;

    return (
        <div className="books">
            <HeadingTitle title="Список книг" />
            <div className="books__buttons">
                <Button className={`books__button ${!showFavorites ? 'active' : ''}`} onClick={handleShowAllClick}>
                    Показать все книги
                </Button>
                <Button className={`books__button ${showFavorites ? 'active' : ''}`} onClick={handleShowFavoritesClick}>
                    Показать избранные
                </Button>
            </div>
            <div className="books__books-container">
                {currentBooks.map(book => {
                    const description = book.summaries?.[0] || 'Описание отсутствует';
                    const imageUrl = book.formats['image/jpeg'];
                    return (
                        <div key={book.id} className="books__card">
                            <div key={book.id} onClick={() => handleCardClick(book.id)} className="books__top-container">
                                <div className="books__header">
                                    <div className="books__avatar">{book.authors[0]?.name[0] || '?'}</div>
                                    <div className="books__info">
                                        <h3 className="books__title">{book.title}</h3>
                                        <p className="books__author">{book.authors[0]?.name || 'Неизвестный автор'}</p>
                                    </div>
                                </div>
                                {imageUrl && <img src={imageUrl} alt={book.title} className="books__image" />}
                                <p className="books__description">{description.slice(0, 100)}...</p>
                            </div>
                            <div className="books__footer">
                                <button className="books__like" aria-label="Добавить в избранное" onClick={() => handleLikeClick(book.id)}>
                                    <svg
                                        className={`books__like-icon ${likedBooks.includes(book.id) ? 'liked' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                                <button
                                    className="books__delete"
                                    aria-label="Удалить книгу"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleDeleteClick(book.id);
                                    }}
                                >
                                    <img src={require('./img/icon-delete.png')} alt="Иконка удаления" className="books__delete-icon" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {filteredBooks.length > booksPerPage && (
                <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredBooks.length / booksPerPage)} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default BooksPage;
