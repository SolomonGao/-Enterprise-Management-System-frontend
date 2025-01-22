import React, { useState, useEffect } from 'react';


type Material = {
  name: string;
  drawing_no_id: string;
  requiredQuantity: number;
  availableQuantity: number;
};

type Props = {
  materials: Material[];
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean; // 控制加载状态
};

const MaterialCheckModal: React.FC<Props> = ({ materials, onConfirm, onClose, isLoading }) => {
  const [canConfirm, setCanConfirm] = useState(false);

  const [purchaseQuantity, setPurchaseQuantity] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

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

  // 检查库存是否满足生产需求
  const checkStock = () => {
    const allSufficient = materials.every(
      (material) => material.requiredQuantity <= material.availableQuantity
    );
    setCanConfirm(allSufficient);
  };

  // 检查库存并显示
  useEffect(() => {
    checkStock();
  }, [materials]);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-[1300px] w-full max-h-[90vh] overflow-auto shadow-xl relative">
        <button
          onClick={onClose} // 关闭模态框
          className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">库存检查</h3>

        {/* 物料信息表格 */}
        {isLoading ? (
          <div className="text-black dark:text-white">加载中...</div>
        ) : (
          <div className="mt-6">
            <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                <tr>
                  <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                  <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图纸号</th>
                  <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">需求数量</th>
                  <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">可用数量</th>
                  <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => {
                  const isLowStock = material.requiredQuantity > material.availableQuantity;
                  return (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.name}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.drawing_no_id}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.requiredQuantity}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{material.availableQuantity}</td>
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
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {canConfirm ? (
          <button onClick={onConfirm} className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
            确认
          </button>
        ) : (
          <p className="mt-4 text-red-500">库存不足，请采购零配件</p>
        )}
      </div>
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

export default MaterialCheckModal;
