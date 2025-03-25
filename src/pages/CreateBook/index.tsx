import { useDispatch } from 'react-redux';
import { addBookLocally } from '../../redux/Books/bookslice';
import HeadingTitle from '../../components/HeadingTitle';
import { useState } from 'react';
import './CreateBook.scss';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { IBook } from '../../redux/types/types';

interface BookFormProps {
    onSubmit?: (book: IBook) => void;
    initialData?: IBook;
}

export const initialBook = {
    id: '',
    title: '',
    authors: [{ name: '', birth_year: undefined, death_year: undefined }],
    description: '',
    summaries: [],
    imageUrl: '',
    category: '',
    likeCount: 0,
    subjects: [],
    bookshelves: [],
    languages: [],
    copyright: false,
    downloadCount: 0,
    formats: {},
};

const CreateBook = ({ onSubmit, initialData }: BookFormProps) => {
    const dispatch = useDispatch();
    const [book, setBook] = useState<IBook>(initialData || initialBook);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: ['subjects', 'bookshelves', 'languages'].includes(name) ? value.split(',').map(item => item.trim()) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Сохранение книги:', book);
        dispatch(addBookLocally(book));
        setBook(initialBook);
        toast.success('Книга успешно создана!');
    };

    return (
        <div>
            <HeadingTitle title="Создать книгу" />
            <form onSubmit={handleSubmit} className="form">
                <input className="form__field" type="text" name="title" value={book.title} onChange={handleChange} required placeholder="Название книги" />
                <textarea
                    className="form__field form__field_textarea"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    required
                    placeholder="Описание"
                />
                <input className="form__field" type="text" name="category" value={book.category} onChange={handleChange} required placeholder="Категория" />
                <input
                    className="form__field"
                    type="text"
                    name="subjects"
                    value={book.subjects.join(', ')}
                    onChange={handleChange}
                    required
                    placeholder="Темы (через запятую)"
                />
                <input
                    className="form__field"
                    type="text"
                    name="bookshelves"
                    value={book.bookshelves.join(', ')}
                    onChange={handleChange}
                    required
                    placeholder="Книжные полки (через запятую)"
                />
                <input
                    className="form__field"
                    type="text"
                    name="languages"
                    value={book.languages.join(', ')}
                    onChange={handleChange}
                    required
                    placeholder="Языки (через запятую)"
                />
                <Button type="submit">Создать</Button>
            </form>
        </div>
    );
};

export default CreateBook;
