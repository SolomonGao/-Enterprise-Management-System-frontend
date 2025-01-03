import React from "react";

interface PaginationProps {
  totalPages: number; // 总页数
  currentPage: number; // 当前页
  onPageChange: (page: number) => void; // 页码改变回调函数
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
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

      {/* 当前页和下一页按钮 */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage)}
        className={`px-3 py-1 rounded-lg ${currentPage !== totalPages
            ? 'dark:bg-blue-500 bg-blue-300 dark:text-white text-black dark:hover:bg-blue-600 hover:bg-blue-400'
            : 'dark:bg-gray-800 bg-gray-300 dark:text-white text-black cursor-not-allowed'
          }`}
      >
        {currentPage}
      </button>

      <button
        disabled={currentPage === totalPages}
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
