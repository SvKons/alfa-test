import './Loader.scss';

const Loader = () => {
    return (
        <div className="loading-container">
            <div className="loading-container__spinner"></div>
            <p className="loading-container__loading-text">Загрузка...</p>
        </div>
    );
};

export default Loader;
