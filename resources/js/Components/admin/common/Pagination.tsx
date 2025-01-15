import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
}

const itemsPerPageOptions = [5, 10, 25, 50];

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    onItemsPerPageChange
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Tạo mảng các số trang với dots
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Luôn hiển thị trang đầu
        pages.push(1);

        // Thêm dots hoặc số trang ở giữa
        if (currentPage <= 3) {
            pages.push(2, 3, 4, '...', totalPages - 1);
        } else if (currentPage >= totalPages - 2) {
            pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
            pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
        }

        // Luôn hiển thị trang cuối
        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-px-4 tw-py-3 sm:tw-px-6 tw-gap-4">
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-4">
                <div className="tw-flex tw-items-center tw-gap-2">
                    <label className="tw-flex tw-items-center tw-gap-2">
                        <span className="tw-text-sm tw-text-gray-600 tw-whitespace-nowrap">Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="tw-form-select tw-rounded-lg tw-border tw-border-gray-300 tw-text-sm tw-py-1 tw-pl-3 tw-pr-8 hover:tw-border-gray-400 focus:tw-border-primary-500 focus:tw-ring-1 focus:tw-ring-primary-500"
                            style={{ minWidth: '80px' }}
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className="tw-text-sm tw-text-gray-600 tw-whitespace-nowrap">entries</span>
                    </label>
                </div>
                <div className="tw-text-sm tw-text-gray-600 tw-whitespace-nowrap">
                    <span className="tw-hidden sm:inline">Showing </span>
                    <span className="tw-font-medium tw-text-gray-900">{startItem}</span>
                    <span className="tw-mx-1">to</span>
                    <span className="tw-font-medium tw-text-gray-900">{endItem}</span>
                    <span className="tw-mx-1">of</span>
                    <span className="tw-font-medium tw-text-gray-900">{totalItems}</span>
                    <span className="tw-hidden sm:inline"> results</span>
                </div>
            </div>

            <div className="tw-flex tw-items-center tw-gap-2">
                {/* Mobile Navigation */}
                <div className="sm:tw-hidden tw-flex tw-gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="tw-hidden sm:tw-flex tw-items-center tw-gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`dots-${index}`} className="tw-px-4 tw-py-2">...</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(Number(page))}
                                className={`
                                    tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-text-sm tw-font-medium
                                    ${currentPage === page
                                        ? 'tw-bg-primary-600 tw-text-white hover:tw-bg-primary-700'
                                        : 'tw-bg-white tw-border tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50'
                                    }
                                    tw-transition-colors tw-duration-150
                                `}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-bg-white tw-text-gray-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed hover:tw-bg-gray-50"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
            </div>
        </div>
    );
}
