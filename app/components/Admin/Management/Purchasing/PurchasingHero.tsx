import { debounce } from 'lodash';
import React, { FC, useCallback } from 'react'
import SearchBar from './SearchBar';
import PurchasingTable from './PurchasingTable'
import Pagination from '@/app/components/Pagination/Pagination';

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

                <div className="mt-5">
                    <PurchasingTable user={user} purchasings={filteredData?.data || []} refetch={refetch} />
                </div>

                {/* 分页组件 */}
                {filteredData?.totalPages > 0 && (
                    <div className="mt-5">
                        <Pagination
                            totalPages={filteredData.totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PurchasingHero