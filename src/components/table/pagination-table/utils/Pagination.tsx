import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface PaginationProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            <button
                disabled={!hasPrevPage}
                className={`p-2 h-10 w-10 flex items-center justify-center rounded-md  ${hasPrevPage ? "bg-primary-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <FaAnglesLeft size={20} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`p-2 h-10 w-10 flex items-center justify-center rounded-md ${currentPage === page ? "bg-primary-blue-900 text-white" : "bg-gray-200"}`}
                >
                    {page}
                </button>
            ))}

            <button className={`p-2 h-10 w-10 flex items-center justify-center rounded-md  ${hasNextPage ? "bg-primary-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                <FaAnglesRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
