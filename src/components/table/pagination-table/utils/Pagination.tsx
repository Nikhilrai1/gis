import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface PaginationProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    color?: {
        paginate_active: string;
        paginate_disable: string;
        disable: string;
        active: string;
    }
}

const Pagination: React.FC<PaginationProps> = ({
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages,
    onPageChange,
    color = {
        active: "bg-primary-blue-900 text-white",
        disable: "bg-gray-200",
        paginate_active: "bg-primary-blue-600 text-white",
        paginate_disable: "bg-gray-200",
    }
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            <button
                disabled={!hasPrevPage}
                className={`p-2 h-10 w-10 flex items-center justify-center rounded-full ${!hasNextPage ? color?.paginate_active : color?.paginate_disable}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <FaAnglesLeft size={20} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`p-2 h-10 w-10 flex items-center justify-center rounded-full ${currentPage === page ? color.active : color.disable}`}
                >
                    {page}
                </button>
            ))}

            <button className={`p-2 h-10 w-10 flex items-center justify-center rounded-full ${!hasPrevPage ? color?.paginate_active : color?.paginate_disable}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                <FaAnglesRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
