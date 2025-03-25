import './Pagination.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} className="pagination__button">
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => handlePageClick(index + 1)} className={`pagination__button ${currentPage === index + 1 ? 'active' : ''}`}>
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} className="pagination__button">
                Next
            </button>
        </div>
    );
};

export default Pagination;
