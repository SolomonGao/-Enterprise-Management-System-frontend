// components/ProductDetailsModal.tsx
import React, { useState } from 'react';
import { Product } from '../../../../../utils/types';
import Pagination from '@/app/components/Pagination/Pagination';
import ImageModal from '../../../ImageModal';

type Props = {
  selectedProduct: Product | null;
  onClose: () => void;
  setCurrentPage: (page: number) => void;
  data: any;
  isSuccess: boolean;
  currentPage: number;
  isProductLoading: boolean;
};

const ProductDetailsModal: React.FC<Props> = ({ selectedProduct, onClose, setCurrentPage, data, isSuccess, currentPage, isProductLoading }) => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  // 图片模态框
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePurchase = (material: any) => {
    setSelectedMaterial(material);
    setIsPurchasing(true);
  };

  const handleSubmitPurchase = () => {
    if (purchaseQuantity && selectedMaterial) {
      // 这里可以添加逻辑来处理采购操作，比如发送请求到后端
      console.log(`采购了 ${purchaseQuantity} 个 ${selectedMaterial.leafMaterial.name}`);
      setIsPurchasing(false); // 关闭采购输入框
      setPurchaseQuantity(null); // 清空输入框
    }
  };

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-[1300px] w-full max-h-[90vh] overflow-auto shadow-xl relative">
        <button
          onClick={() => onClose()} // 关闭模态框
          className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {selectedProduct.id}
        </h3>

        {/* 相关材料表格 */}
        {isProductLoading ? (
          <div className="text-black dark:text-white">加载中...</div>
        ) : isSuccess && data && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">相关零配件</h4>
            <div className="mt-4 overflow-x-auto"> {/* 添加水平滚动 */}
              <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件图号</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">规格</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">需要数量(单/总)</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余数量</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图纸</th>
                    <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((material: any) => {
                    // 计算所需的总数量
                    const requiredTotal = material.material_counts * selectedProduct.quantity;
                    // 比较剩余数量与需要数量
                    const isLowStock = material.leafMaterial.counts < requiredTotal;

                    return (
                      <tr
                        key={material.leaf_materials_drawing_no}
                        className={`border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}  // 如果剩余数量少于所需数量，背景为红色
                      >
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.name}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leaf_materials_drawing_no}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.specification}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.material_counts}/{requiredTotal}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.counts}</td>
                        <td
                          className="px-4 py-2 text-gray-700 dark:text-gray-200 cursor-pointer"
                          onClick={() => openImageModal(material.leafMaterial.drawing_no_secure_url)}
                        >
                          {material.leafMaterial.drawing_no_secure_url ? "查看图纸" : "/"}
                        </td>

                        {/* 采购按钮 */}
                        {isLowStock && (
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                            <button
                              onClick={() => handlePurchase(material)}
                              className="text-blue-500"
                            >
                              采购
                            </button>
                          </td>
                        )}
                        {!isLowStock && (
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                            /
                        </td>
                        )}
                      </tr>
                    );
                  })}
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

      {/* 图片模态框 */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      {/* 采购弹窗 */}
      {isPurchasing && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              请输入采购数量
            </h3>
            <div className="mt-4">
              <input
                type="number"
                value={purchaseQuantity || ''}
                onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300 rounded"
                placeholder="请输入数量"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitPurchase}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                提交
              </button>
              <button
                onClick={() => setIsPurchasing(false)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto shadow-xl relative">
//         <button
//           onClick={onClose} // 关闭模态框
//           className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
//         >
//           ✕
//         </button>
//         <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//           {selectedProduct.id} - {selectedProduct.quantity} 件
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300">数量: {selectedProduct.quantity}</p>
//         {data?.totalPages > 0 && (
//           <div className="mt-5">
//             <Pagination
//               totalPages={data.totalPages}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         )}
//       </div>
//       {/* 分页组件 */}
//     </div>
//   );
// };

export default ProductDetailsModal;
