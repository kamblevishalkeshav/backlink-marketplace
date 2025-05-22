import React from 'react';

interface MarketplacePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (current: number, total: number) => {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return pages;
};

const MarketplacePagination: React.FC<MarketplacePaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center items-center gap-2 py-4" aria-label="Pagination">
      <button
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      {pageNumbers.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-primary`}
            onClick={() => handlePageClick(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">…</span>
        )
      )}
      <button
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default MarketplacePagination; 