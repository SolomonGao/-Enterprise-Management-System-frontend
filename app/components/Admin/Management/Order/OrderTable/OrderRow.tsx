// components/OrderRow.tsx
import React, { useEffect, useState } from 'react';
import { Product, Order } from './types';


type Props = {
  order: Order;
  onToggleExpanded: (orderId: string) => void;
  onViewProductDetails: (product: Product) => void;
  isExpanded: boolean;
  handleStatusChange: (orderId: string, newStatus: string, version: number) => void;
  isUpdating: boolean;
  calculateRemainingDays: (deadline: string) => number;
  getRowClassName: (remainingDays: number) => string;
  handleGetMaterials: (order: Order) => void;
  isLoading: boolean;
  showCompleted: boolean;
};

const OrderRow: React.FC<Props> = ({
  order,
  onToggleExpanded,
  onViewProductDetails,
  isExpanded,
  handleStatusChange,
  isUpdating,
  calculateRemainingDays,
  getRowClassName,
  handleGetMaterials,
  isLoading,
  showCompleted,
}) => {

  const remainingDays = calculateRemainingDays(order.deadline);

  const [isDone, setIsDone] = useState(order.status === '已完成'); // 初始化状态
  const [showConfirm, setShowConfirm] = useState(false); // 控制模态框显示

  useEffect(() => {
    setIsDone(order.status === '已完成'); // 动态更新 isDone
  }, [order.status]);

  const handleConfirm = () => {
    handleStatusChange(order._id, "已完成", order.__v); // 调用状态更新函数
    setShowConfirm(false); // 隐藏模态框
  };

  const handleCancel = () => {
    setShowConfirm(false); // 隐藏模态框
  };

  const getStatusOptions = (currentStatus: string) => {
    if (currentStatus === "初始" || currentStatus === "准备配件中") {
      return ["初始", "准备配件中"];
    }
    if ( currentStatus === "待发货" || currentStatus === "发货中") {
      return ["待发货", "发货中"];
    }
    return ["已完成"];
  };

  const statusOptions = getStatusOptions(order.status);

    // 如果 showCompleted 为 false 并且订单状态为 "已完成"，直接返回 null，不渲染该行
    if (!showCompleted && isDone) {
      return null;
    }

  return (
    <>
      <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{order.customer}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{order.phoneNumber}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{order.address}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{order.deadline}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{new Date(order.createdAt).toLocaleString()}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
          {order.products.length > 0 ? (
            <div>
              {order.products.length === 1 ? (
                <div className="flex items-center gap-1 p-2 bg-transparent rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <span
                    onClick={() => onViewProductDetails(order.products[0])}
                    className="text-gray-800 dark:text-gray-200 font-semi cursor-pointer truncate"
                  >
                    {order.products[0].id} (数量: {order.products[0].quantity})
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => onToggleExpanded(order._id)}
                  className={`ml-2 text-blue-500 text-sm font-semi transition-all duration-300 ease-in-out transform inline-flex items-center gap-1 p-1 hover:text-blue-700`}
                >
                  {isExpanded ? (
                    <>
                      <span>收起</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v7.293l3.146-3.147a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 13.293V6a1 1 0 011-1z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>显示</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v7.293l3.146-3.147a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 13.293V6a1 1 0 011-1z" />
                      </svg>
                    </>
                  )}
                </button>
              )}
              {isExpanded && (
                <div className="ml-4 mt-2 space-y-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-1 p-2 bg-transparent rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                      <span
                        onClick={() => onViewProductDetails(product)}
                        className="text-gray-800 dark:text-gray-200 font-semi cursor-pointer truncate"
                      >
                        {product.id} (数量: {product.quantity})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="ml-4 mt-2 text-gray-600 dark:text-gray-400">没有产品</div>
          )}
        </td>
        {!isDone ? (
          <td className={`${getRowClassName(remainingDays)} px-4 py-2 font-medium`}>
            {remainingDays}
          </td>
        ) : (
          <td className="px-4 py-2 font-medium">已完成</td>
        )}
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
          {['待发货', '发货中'].includes(order.status) ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
              disabled={isLoading}
            >
              完成
            </button>
          ) : (
            <button
              onClick={() => { handleGetMaterials(order) }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              出库
            </button>
          )}
        </td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value, order.__v)}
            disabled={isUpdating}
            className={`px-4 py-2 border border-gray-600 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-300 dark:hover:bg-gray-900`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

        </td>
      </tr>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-11/12 max-w-lg">
            <p className="text-gray-800 dark:text-gray-200 text-center text-lg font-semibold">
              请确认此订单已经完成交付
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirm}
                className="px-6 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                确认
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default OrderRow;
