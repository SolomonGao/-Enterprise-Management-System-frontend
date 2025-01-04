'use client';
import React, { useEffect, useState } from "react";
import AddRootMaterial from "@/app/components/Admin/Management/Material/AddRootMaterial";
import { useGetAllRootQuery, useGetMaterialsByRootQuery } from "@/redux/features/material/materialApi";
import HeaderBar from "./HeadBarMaterial";
import { Typography } from "@mui/material";
import MaterialHero from "./MaterialHero";
import toast from "react-hot-toast";

interface DataItem {
  idroot_material: string;
  root_name: string;
  // 其他字段...
}

type Props = {};

const Material = (props: Props) => {
  const [added, setAdded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filters, setFilters] = useState<{ searchBy: string; search?: string; countsRange?: string }>({
    searchBy: "name",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  // 获取分类数据
  const { data, error, refetch: refetchRoot } = useGetAllRootQuery({});

  // 获取过滤后的原料数据，并添加分页参数
  const { data: filteredData, refetch, isLoading: isFetching, error: leafError } = useGetMaterialsByRootQuery({
    category: selectedCategory,
    terms: filters,
    page: currentPage,
  });

  const [materials, setMaterials] = useState<any[]>([]);  // 用来管理原料数据

  useEffect(() => {
    if (filteredData?.data) {
      setMaterials(filteredData?.data);  // 将获取的原料数据存储在父组件状态中
      setTotalPages(filteredData?.totalPages);
    }
  }, [filteredData]);

    // 更新数量的回调函数
    const handleUpdateCounts = (id: string, newCounts: number) => {
      setMaterials((prevMaterials) => {
        return prevMaterials.map((material) =>
          material.drawing_no_id === id ? { ...material, counts: newCounts } : material
        );
      });
    };

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log('An error occurred: ', error);
      }
    }
  }, [error]);

  useEffect(() => {
    if (leafError) {
      if ("data" in leafError) {
        const errorData = leafError as any;
        toast.error(errorData.data.message);
      } else {
        console.log('An error occurred: ', leafError);
      }
    }
  }, [leafError]);

  useEffect(() => {
    if (added) {
      setAdded(false); // 重置 added 状态
      refetch(); // 重新获取数据
      refetchRoot(); // 刷新分类数据
    }
  }, [added, refetch, refetchRoot]);

  return (
    <div>
      <div className="w-full p-5">
        {/* 添加原料按钮 */}
        <div className="z-50">
          <AddRootMaterial
            options={Array.isArray(data?.data) ? data.data.map((item: DataItem) => item) : []}
            setAdded={setAdded} // 传递 setAdded 函数给子组件
          />
        </div>
        <HeaderBar
          active={active}
          setActive={setActive}
        />

        <div>
          {
            active === 1 && (
              <MaterialHero
                data={data}
                materials={materials}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filters={filters}
                setFilters={setFilters}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isFetching={isFetching}
                refetch={refetch}
                handleUpdateCounts={handleUpdateCounts}
                totalPages={totalPages}
              />
            )
          }

          {isFetching && (
            <div className="fixed dark:text-white text-black top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Typography variant="h6" className='dark:text-white text-black'>
                加载中...
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
