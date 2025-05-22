import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage = 20,
  onRowsPerPageChange
}) => {
  const pageNumbers = [];
  
  // Create pagination range
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <label htmlFor="rows-per-page" className="text-sm text-gray-500">
          Rows
        </label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
          className="text-sm border border-gray-300 rounded-md p-1"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-gray-500 mr-4">
          Page {currentPage} of {totalPages}
        </span>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="text-gray-500">...</span>
              )}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`w-8 h-8 flex items-center justify-center rounded border text-sm ${
                currentPage === number
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="text-gray-500">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-gray-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination; 