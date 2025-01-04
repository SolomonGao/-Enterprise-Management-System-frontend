import React, { FC, useCallback, useEffect, useState } from 'react'
import Dropdown from '../Material/Dropdown'
import SearchBar from '../Material/SearchBar'
import MaterialSelectedCatelogy from '../Material/MaterialSelectedCatelogy'
import { Typography } from '@mui/material'
import { useGetAllRootQuery, useGetMaterialsByRootQuery } from '@/redux/features/material/materialApi'
import { debounce } from 'lodash'
import Pagination from "../../../Pagination/Pagination";

type UsedMaterial = {
    id: string;
    quantity: number;
};

type Props = {
    selectedMaterialsId: UsedMaterial[];
    setSelectedMaterialsId: (selectedMaterialsId: UsedMaterial[] | ((prev: UsedMaterial[]) => UsedMaterial[])) => void;
    preButton: () => void;
    nextButton: () => void;
}

const MaterialSelect: FC<Props> = (props: Props) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [filters, setFilters] = useState<{ searchBy: string; search?: string; countsRange?: string }>({
        searchBy: "name",
    });
    const [currentPage, setCurrentPage] = useState(1);



    // 获取分类数据
    const { data, error, isLoading, refetch: refetchRoot } = useGetAllRootQuery({});

    // 获取过滤后的原料数据，并添加分页参数
    const { data: filteredData, refetch, isLoading: isFetching } = useGetMaterialsByRootQuery({
        category: selectedCategory,
        terms: filters,
        page: currentPage,
    });

    useEffect(() => {
        if (added === true) {
            setAdded(false);
            refetch();
            refetchRoot();
        }

    }, [added, refetch, refetchRoot])


    // 使用防抖函数包装搜索操作
    const handleFilters = useCallback(
        debounce((newFilters: any) => {
            setFilters(newFilters);
            setCurrentPage(1);
            refetch();
        }, 300),
        [refetch]
    );

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
                    {/* 搜索栏 */}
                    <SearchBar onSearch={handleFilters} />
                </div>

                {/* 分类下拉菜单 */}
                <div className="mt-5">
                    <Dropdown
                        options={Array.isArray(data?.data) ? data.data.map(item => item) : []}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        disableAll={false}
                    />
                </div>

                {/* 显示原料信息 */}
                <div className="mt-5">
                    <MaterialSelectedCatelogy
                        materials={filteredData?.data || []}
                        selectedMaterialsId={props.selectedMaterialsId}
                        setSelectedMaterialsId={props.setSelectedMaterialsId}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                         />

                </div>
                {filteredData?.totalPages > 0 && (
                    <div className="mt-5">
                        <Pagination
                            totalPages={filteredData.totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
                <div className='w-full flex-col 800px:flex-row flex items-center justify-between'>
                    <div
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                        onClick={() => props.preButton()}
                    >
                        上一步
                    </div>
                    <div
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-[#fff] rounded mt-8 cursor-pointer'
                        onClick={() => props.nextButton()}
                    >
                        下一步
                    </div>
                </div>
                {isFetching && (<div className="fixed dark:text-white text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Typography variant="h6" className='dark:text-white text-black'>
                        加载中...
                    </Typography> </div>)}
            </div>
        </div>
    )
}

export default MaterialSelect