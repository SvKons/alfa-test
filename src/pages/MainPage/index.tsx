import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
