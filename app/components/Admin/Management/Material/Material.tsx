'use client';
import React, { useCallback, useEffect, useState } from "react";
import AddRootMaterial from "@/app/components/Admin/Management/Material/AddRootMaterial";
import Dropdown from "@/app/components/Admin/Management/Material/Dropdown";
import { useGetAllRootQuery, useGetMaterialsByRootQuery } from "@/redux/features/material/materialApi";
import MaterialCatelogy from "./MaterialCatelogy";
import SearchBar from "@/app/components/Admin/Management/Material/SearchBar";
import Pagination from "../../../Pagination/Pagination";
import HeaderBar from "./HeadBarMaterial";
import { Typography } from "@mui/material";
import { debounce } from "lodash";

type Props = {};

const Material = (props: Props) => {
  const [added, setAdded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filters, setFilters] = useState<{ searchBy: string; search?: string; countsRange?: string }>({
    searchBy: "name",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(1);  // 控制 HeaderBar 激活项状态
  const [active, setActive] = useState(1);

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

      <div className="w-full p-5">
        {/* 添加原料按钮 */}
        <div className="z-50">
          <AddRootMaterial
            options={Array.isArray(data?.data) ? data.data.map(item => item) : []}
            setAdded={setAdded}
          />
        </div>
        <HeaderBar
          active={active}
          setActive={setActive}
        />

        <div>
          {
            active === 1 && (
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
                  <MaterialCatelogy materials={filteredData?.data || []} />
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
              </div>
            )
          }
          {isFetching && (<div className="fixed dark:text-white text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Typography variant="h6" className='dark:text-white text-black'>
              加载中...
            </Typography> </div>)}
        </div>
      </div>
    </div>
  );
};

export default Material;
