import { Link } from 'react-router-dom';
import { pages } from './utils';
import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__wrapper container">
                {pages.map(({ title, path }) => (
                    <div className="header__item" key={title}>
                        <Link key={title} to={path} className="header__link">
                            {title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
