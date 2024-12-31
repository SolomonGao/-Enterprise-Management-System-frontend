import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetMaterialsByProductQuery } from "@/redux/features/product/productApi";
import Pagination from "@/app/components/Pagination/Pagination";
import toast from "react-hot-toast";

type Product = {
  idproduct: string;
  model_name: string;
  pump_model: string;
  drawing_no_id: string;
  manufacturer: string;
  drawing_no_secure_url: string;
};

type Props = {
  products: Product[];
};

const ProductCatalog: React.FC<Props> = ({ products }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProductLoading, setIsProductLoading] = useState(false); // 新增 loading 状态

  const { data, isSuccess, error } = useGetMaterialsByProductQuery(
    {
      idProduct: selectedProduct?.idproduct || "",
      page: currentPage,
    },
    { skip: !selectedProduct?.idproduct }
  );

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured: ", error);
      }
    }
  }, [error]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 图片模态框
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(null); // 重置 selectedProduct
    setIsProductLoading(true); // 设置加载状态为 true
    setCurrentPage(1);
    setSelectedProduct(product); // 设置当前选中的产品

  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 确保在数据加载完成前，不渲染原材料信息
  useEffect(() => {
    if (isSuccess && data) {
      setIsProductLoading(false); // 数据加载完成，取消加载状态
    }
  }, [isSuccess, data]);

  return (
    <div>
      {/* 图片模态框 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full z-10"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="大图"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}

      {/* 产品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.idproduct}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                ID: {product.idproduct} 名称：{product.model_name}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleExpand(product.idproduct)}
                  className="text-blue-600 dark:text-blue-400 md:hidden"
                >
                  {expandedIds.includes(product.idproduct) ? "收起" : "展开"}
                </button>
              </div>
            </div>

            <div
              className={`mt-4 space-y-2 ${expandedIds.includes(product.idproduct) || "md:block hidden"
                }`}
            >
              <div className="text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <p>泵型号: {product.pump_model}</p>
                  <button
                    onClick={() => viewProductDetails(product)}
                    className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full focus:outline-none"
                  >
                    查看详情
                  </button>
                </div>
                <p className="mb-2">制造商: {product.manufacturer}</p>
                <p>图号ID: {product.drawing_no_id}</p>
              </div>
              {product.drawing_no_secure_url && (
                <div
                  className="relative w-full h-48 mt-2 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => openImageModal(product.drawing_no_secure_url)}
                >
                  <Image
                    src={product.drawing_no_secure_url}
                    alt={`${product.model_name} 图纸`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 产品详情模态框 */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto shadow-xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {selectedProduct.model_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">泵型号: {selectedProduct.pump_model}</p>
            <p className="text-gray-600 dark:text-gray-300">制造商: {selectedProduct.manufacturer}</p>
            <p className="text-gray-600 dark:text-gray-300">图号ID: {selectedProduct.drawing_no_id}</p>

            {/* 相关材料表格 */}
            {isProductLoading ? (
              <div className="text-black dark:text-white">加载中...</div>
            ) : isSuccess && data && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">相关材料</h4>
                <div className="mt-4 overflow-x-auto"> {/* 添加水平滚动 */}
                  <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                      <tr>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件图号</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">需要数量</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余数量</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((material: any) => (
                        <tr key={material.leaf_materials_drawing_no} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.name}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leaf_materials_drawing_no}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.material_counts}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.counts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* 分页组件 */}
                {data?.totalPages > 0 && (
                  <div className="mt-5">
                    <Pagination
                      totalPages={data.totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
