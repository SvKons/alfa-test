import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/index.scss';
import { Provider } from 'react-redux';
import MainPage from './pages/MainPage';
import { store } from './redux/store';
import BookPage from './pages/BookPage';
import CreateBook from './pages/CreateBook';
import BooksPage from './pages/BooksPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainPage />,
            children: [
                { path: 'books', element: <BooksPage /> },
                { path: 'books/:id', element: <BookPage /> },
                { path: 'create-product', element: <CreateBook /> },
            ],
        },
    ],
    { basename: '/alfa' }
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
