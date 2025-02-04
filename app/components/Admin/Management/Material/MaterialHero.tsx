import React, { useCallback } from "react";
import SearchBar from "@/app/components/Admin/Management/Material/SearchBar";
import Dropdown from "@/app/components/Admin/Management/Material/Dropdown";
import MaterialCatelogy from "./MaterialCatelogy";
import Pagination from "../../../Pagination/Pagination";
import { Typography } from "@mui/material";
import { debounce } from "lodash";

interface DataItem {
  idroot_material: string;
  root_name: string;
  // 其他字段...
}

type MaterialHeroProps = {
  data: any;
  materials: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isFetching: boolean;
  refetch: () => void;
  handleUpdateCounts: (id: string, newCounts: number) => void;
  totalPages: number;
};

const MaterialHero: React.FC<MaterialHeroProps> = ({
  data,
  materials,
  selectedCategory,
  setSelectedCategory,
  filters,
  setFilters,
  currentPage,
  setCurrentPage,
  isFetching,
  refetch,
  handleUpdateCounts,
  totalPages,
}) => {
  
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
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* 搜索栏 */}
      <div className="w-full p-5">
        <SearchBar onSearch={handleFilters} />
      </div>

      {/* 分类下拉菜单 */}
      <div className="mt-5">
        <Dropdown
          options={Array.isArray(data?.data) ? data.data.map((item: DataItem) => item) : []}
          value={selectedCategory}
          onChange={setSelectedCategory}
          disableAll={true}
        />
      </div>

      {/* 显示原料信息 */}
      <div className="mt-5">
        <MaterialCatelogy materials={materials || []} handleUpdateCounts={handleUpdateCounts} />
      </div>

      {/* 分页组件 */}
      {totalPages > 0 && (
        <div className="mt-5">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* 加载中提示 */}
      {isFetching && (
        <div className="fixed dark:text-white text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Typography variant="h6" className="dark:text-white text-black">
            加载中...
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MaterialHero;
