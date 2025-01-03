// components/ProductDetailsModal.tsx
import React from 'react';
import { Product } from './types';
import Pagination from '@/app/components/Pagination/Pagination';

type Props = {
  selectedProduct: Product | null;
  onClose: () => void;
  setCurrentPage: (page: number) => void;
  data: any;
  isSuccess: boolean;
  currentPage: number;
  isProductLoading: boolean;
};

const ProductDetailsModal: React.FC<Props> = ({ selectedProduct, onClose, setCurrentPage, data, isSuccess, currentPage, isProductLoading}) => {


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!selectedProduct) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto shadow-xl relative">
            <button
              onClick={() => onClose()} // 关闭模态框
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
            >
              ✕
            </button>
            {/* <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {selectedProduct.model_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">泵型号: {selectedProduct.pump_model}</p>
            <p className="text-gray-600 dark:text-gray-300">制造商: {selectedProduct.manufacturer}</p>
            <p className="text-gray-600 dark:text-gray-300">图号ID: {selectedProduct.drawing_no_id}</p> */}

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
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">需要数量(单/总)</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余数量</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((material: any) => (
                        <tr key={material.leaf_materials_drawing_no} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leafMaterial.name}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.leaf_materials_drawing_no}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.material_counts}/{material.material_counts * selectedProduct.quantity}</td>
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
