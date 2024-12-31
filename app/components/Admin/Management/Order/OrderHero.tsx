import { Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { FC, useCallback } from 'react'
import SearchBar from './SearchBar';
import Pagination from '@/app/components/Pagination/Pagination';
import OrderTable from './OrderTable/OrderTable';

type Props = {
    filteredData: any;
    filters: any;
    setFilters: (filters: any) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isFetching: boolean;
    refetch: () => void;
}

const OrderHero: FC<Props> = ({
    filteredData,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    isFetching,
    refetch, }) => {

    // 防抖搜索
    const handleFilters = useCallback(
        debounce((newFilters: any) => {
            setFilters(newFilters);
            setCurrentPage(1);
            refetch();
        }, 300),
        [refetch]
    );

    // 防抖翻页
    const handlePageChange = useCallback(
        debounce((page: number) => {
            setCurrentPage(page);
            refetch();
        }, 300),
        [refetch]
    );


    return (
        <div>
            <div className="p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <div className="w-full p-5">
                    <SearchBar onSearch={handleFilters} />
                </div>

                <div className="mt-5">
                    <OrderTable orders={filteredData?.data || []} refetch={refetch} />
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
            {isFetching && (<div className="fixed dark:text-white text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Typography variant="h6" className='dark:text-white text-black'>
                    加载中...
                </Typography> </div>)}
        </div>
    )
}

export default OrderHero;