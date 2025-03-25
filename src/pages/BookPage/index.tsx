import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getBookById } from '../../redux/Books/bookslice';
import { AppDispatch, RootState } from '../../redux/store';
import Button from '../../components/Button';
import './BookPage.scss';
import Loader from '../../components/Loader/Loader';
import HeadingTitle from '../../components/HeadingTitle';

const BookPage = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedBook, isLoading } = useSelector((state: RootState) => state.books);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id) {
            dispatch(getBookById(id));
        } else {
            console.error('ID книги не определен');
        }
    }, [dispatch, id]);

    if (isLoading) return <Loader />;
    if (!selectedBook) return <p>Книга не найдена</p>;

    const { title, authors, summaries, formats } = selectedBook;
    const imageUrl = formats['image/jpeg'];
    const description = summaries?.[0] || 'Описание отсутствует';

    return (
        <div className="book-detail">
            <HeadingTitle title="Детальная старница" />
            <Button>
                <Link to="/books" className="book-detail__back-button">
                    ← Вернуться на главную
                </Link>
            </Button>
            <div className="book-detail__container">
                <div className="book-detail__image-container">{imageUrl && <img src={imageUrl} alt={title} className="book-detail__image" />}</div>
                <div className="book-detail__info">
                    <h2 className="book-detail__title">{title}</h2>
                    <p className="book-detail__author">{authors[0]?.name || 'Неизвестный автор'}</p>
                    <p className="book-detail__description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
