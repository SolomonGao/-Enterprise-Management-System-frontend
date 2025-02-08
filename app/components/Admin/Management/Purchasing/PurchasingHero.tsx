import { debounce } from 'lodash';
import React, { FC, useCallback } from 'react'
import SearchBar from './SearchBar';

type Props = {
    filteredData: any;
    filters: any;
    setFilters: (filters: any) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isFetching: boolean;
    refetch: () => void;
    user: any
}

const PurchasingHero: FC<Props> = ({
    filteredData,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    isFetching,
    refetch,
    user
}) => {

    const handleFilters = useCallback(
        debounce((newFilters: any) => {
            setFilters(newFilters);
            setCurrentPage(1);
            refetch();
        }, 300),
        [setFilters, setCurrentPage, refetch]
    );

    // 防抖翻页
    const handlePageChange = useCallback(
        debounce((page: number) => {
            setCurrentPage(page);
            refetch();
        }, 300),
        [setCurrentPage, refetch]
    );

    return (
        <div>
            <div className="p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <div className="w-full p-5">
                    <SearchBar onSearch={handleFilters} />
                </div>
            </div>
        </div>
    )
}

export default PurchasingHero