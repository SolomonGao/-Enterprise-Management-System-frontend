// components/OrderRow.tsx
import React from 'react';
import { Product, Order } from './types';
import { useGetRequiredMaterialsMutation } from '@/redux/features/order/orderApi';

type Props = {
  order: Order;
  onToggleExpanded: (orderId: string) => void;
  onViewProductDetails: (product: Product) => void;
  isExpanded: boolean;
  handleStatusChange: (orderId: string, newStatus: string, version: number) => void;
  isUpdating: boolean;
  calculateRemainingDays: (deadline: string) => number;
  getRowClassName: (remainingDays: number) => string;
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
}) => {
  const remainingDays = calculateRemainingDays(order.deadline);

  const [getRequiredMaterials, { isSuccess }] = useGetRequiredMaterialsMutation()

  const handleGet = async () => {
    await getRequiredMaterials({ products: order.products })
  }

  return (
    <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.customer}</td>
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.phoneNumber}</td>
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.address}</td>
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{order.deadline}</td>
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">{new Date(order.createdAt).toLocaleString()}</td>
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
      <td className={`${getRowClassName(remainingDays)} px-4 py-2 font-medium`}>{remainingDays}</td>
      <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value, order.__v)}
          disabled={isUpdating}
          className={`px-4 py-2 border border-gray-600 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-300 dark:hover:bg-gray-900`}
        >
          <option value="初始">初始</option>
          <option value="准备配件中">准备配件中</option>
          <option value="生成中">生成中</option>
          <option value="待交货">待交货</option>
          <option value="发货中">发货中</option>
          <option value="完成">完成</option>
        </select>
      </td>
      <td>
        <button
          onClick={handleGet}> 确认</button>
      </td>
    </tr>
  );
};


export default OrderRow;
