import React from "react";

interface PaginationProps {
  totalPages: number; // 总页数
  currentPage: number; // 当前页
  onPageChange: (page: number) => void; // 页码改变回调函数
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    // 如果总页数小于等于3，直接显示所有页码
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {

      // 如果当前页大于2，插入省略号
      if (currentPage > 2) {
        pages.push('...');
      }

      // 添加当前页前后各1页
      if (currentPage > 1) {
        pages.push(currentPage - 1);
      }
      pages.push(currentPage);
      if (currentPage < totalPages) {
        pages.push(currentPage + 1);
      }

      // 如果当前页距离最后一页大于2，插入省略号
      if (currentPage < totalPages - 1) {
        pages.push('...');
      }

    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* 上一页按钮 */}
      <button
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "dark:bg-gray-800 bg-gray-300 dark:text-white text-black cursor-not-allowed" : "dark:bg-blue-500 bg-blue-300 dark:text-white text-black dark:hover:bg-blue-600 hover:bg-blue-400"
          }`}
      >
        上一页
      </button>

      {/* 页码按钮 */}
      {generatePages().map((page, index) => (
        <button
          key={index}
          onClick={() => {
            // 仅当页码是数字时才触发页码更改
            if (typeof page === 'number') {
              onPageChange(page);
            }
          }}
          className={`px-3 py-1 rounded-lg ${currentPage === page
              ? 'dark:bg-blue-500 bg-blue-300 dark:text-white text-black dark:hover:bg-blue-600 hover:bg-blue-400'
              : 'dark:bg-gray-800 bg-gray-300 hover:bg-gray-300 dark:text-white text-black'
            }`}
        >
          {page}
        </button>
      ))}

      {/* 下一页按钮 */}
      <button
        disabled={currentPage === totalPages }
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "dark:text-white text-black dark:bg-gray-800 bg-gray-300 cursor-not-allowed" : "dark:bg-blue-500 bg-blue-300 dark:text-white text-black dark:hover:bg-blue-600 hover:bg-blue-400"
          }`}
      >
        下一页
      </button>
    </div>
  );
};

export default Pagination;
