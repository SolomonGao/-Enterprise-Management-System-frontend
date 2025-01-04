'use client'
import { useChangeStatusMutation } from '@/redux/features/order/orderApi';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Product = {
  id: string;
  quantity: number;
};

type Order = {
  _id: string;
  customer: string;
  phoneNumber: string;
  address: string;
  status: string;
  deadline: string;
  products: Product[];
  comments: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


type Props = {
  orders: Order[];
  refetch: () => void;
}

const OrderTable: FC<Props> = ({ orders, refetch }) => {

  const today = new Date().toISOString().split('T')[0];

  const [filterDays, setFilterDays] = useState<number | null>(null); // 用来存储筛选条件：剩余天数的最大值
  const [filteredOrders, setFilteredOrders] = useState(orders); // 存储筛选后的订单

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set()); // 存储展开的订单ID集合
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 用于存储点击的产品

      const [changeStatus, { isLoading: isUpdating }] = useChangeStatusMutation();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterDays(value ? parseInt(value) : null); // 如果输入为空，则不做筛选
  };

  // 当筛选条件更新时，过滤订单
  useEffect(() => {
    if (filterDays !== null) {
      const filtered = orders.filter((order) => {
        const remainingDays = calculateRemainingDays(order.deadline);
        return remainingDays <= filterDays; // 筛选出剩余天数小于等于输入值的订单
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // 如果没有筛选条件，则显示所有订单
    }
  }, [filterDays, orders]); // 当 filterDays 或 orders 改变时重新筛选

  const calculateRemainingDays = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const todayDate = new Date(today);

    const timeDifference = deadlineDate.getTime() - todayDate.getTime();

    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const getRowClassName = (remainingDays: number) => {
    if (remainingDays < 10) {
      return 'text-red-400 font-semibold'; // 红色预警
    } else if (remainingDays < 30) {
      return 'text-yellow-400 font-semibold'; // 黄色预警
    }
    return 'text-gray-800 dark:text-gray-300'; // 默认样式
  };

  // 处理订单的展开/收起
  const toggleExpanded = (orderId: string) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (newExpandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId); // 如果已展开，则收起
    } else {
      newExpandedOrders.add(orderId); // 如果未展开，则展开
    }
    setExpandedOrders(newExpandedOrders);
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product); // 设置选择的产品
  };

  const handleStatusChange = async (orderId: string, newStatus: string, version: number) => {
    try {
        await changeStatus({ orderId, newStatus, version }).unwrap();  // 确保异步操作完成
        toast.success(`更新订单状态成功`)
        refetch();
    } catch (error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
    }
};

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="filterDays" className="block mb-2 text-gray-800 dark:text-gray-300">筛选剩余天数小于等于</label>
        <input
          type="number"
          id="filterDays"
          value={filterDays ?? ''}
          onChange={handleFilterChange}
          placeholder="请输入天数"
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            {/* 在桌面端显示的列 */}
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">客户</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">电话</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">地址</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">截止日期</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">创建时间</th>

            {/* 在手机端始终显示的列 */}
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => {
            const remainingDays = calculateRemainingDays(order.deadline); // 计算每个订单的剩余天数
            const isExpanded = expandedOrders.has(order._id); // 判断当前订单是否展开
            return (
              <tr key={order._id} className={` border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                {/* 在桌面端显示的列 */}
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.customer}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.phoneNumber}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.address}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.deadline}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{new Date(order.createdAt).toLocaleString()}</td>
                {/* 在手机端始终显示的列 */}
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
                  {order.products.length > 0 ? (
                    <div>
                      {/* 如果只有一个产品，直接展示 */}
                      {order.products.length === 1 ? (
                        <div className="flex items-center gap-1 p-2 bg-transparent rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                          <span
                            onClick={() => viewProductDetails(order.products[0])}
                            className="text-gray-800 dark:text-gray-200 font-semi cursor-pointer truncate"
                          >
                            {order.products[0].id} (数量: {order.products[0].quantity})
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleExpanded(order._id)}
                          className={`ml-2 text-blue-500 text-sm font-semi transition-all duration-300
                             ease-in-out transform inline-flex items-center gap-1 p-1 hover:text-blue-700`}
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

                      {/* 展开显示产品详情 */}
                      {isExpanded && (
                        <div className="ml-4 mt-2 space-y-2">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex items-center gap-1 p-2 bg-transparent rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                              <span
                                onClick={() => viewProductDetails(product)}
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

                {/* 显示剩余天数 */}
                <td className={`${getRowClassName(remainingDays)} px-4 py-2 font-medium`}>{remainingDays}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value, order.__v)}
                    disabled={isUpdating}
                    className={`px-4 py-2 border border-gray-600 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-300 dark:hover:bg-gray-900 ${order.status === "未完成"
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-700"
                      }`}
              >
                  <option
                      value="未完成"
                      className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  >未完成</option>
                  <option
                      value="已完成"
                      className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  >已完成</option>
                    
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto shadow-xl relative">
            <button
              onClick={() => setSelectedProduct(null)} // 关闭模态框
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {selectedProduct.id} - {selectedProduct.quantity} 件
            </h3>
            {/* 在这里展示更多的产品详情 */}
            <p className="text-gray-600 dark:text-gray-300">数量: {selectedProduct.quantity}</p>
            {/* 你可以根据实际需要展示更多的字段 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;