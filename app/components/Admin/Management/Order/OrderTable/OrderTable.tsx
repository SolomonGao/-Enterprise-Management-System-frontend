// components/OrderTable.tsx
import React, { FC, useState, useEffect } from 'react';
import FilterSection from './FilterSection';
import OrderRow from './OrderRow';
import ProductDetailsModal from './ProductDetailsModal';
import { Order, Product } from './types';
import { useChangeStatusMutation } from '@/redux/features/order/orderApi';
import toast from 'react-hot-toast';
import { useGetMaterialsByProductQuery } from '@/redux/features/product/productApi';

type Props = {
  orders: Order[];
  refetch: () => void;
};

const OrderTable: FC<Props> = ({ orders, refetch }) => {

  const [filterDays, setFilterDays] = useState<number | null>(null);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const today = new Date().toISOString().split('T')[0];

  const [changeStatus, { isLoading: isUpdating }] = useChangeStatusMutation();

  const [isProductLoading, setIsProductLoading] = useState(false); // 新增 loading 状态
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess, error } = useGetMaterialsByProductQuery(
    {
      idProduct: selectedProduct?.id || "",
      page: currentPage,
    },
    { skip: !selectedProduct?.id }
  );




  useEffect(() => {
    if (isSuccess) {
      setIsProductLoading(false);
    }
  }, [isSuccess])

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterDays(value ? parseInt(value) : null);
  };
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

  useEffect(() => {
    if (filterDays !== null) {
      const filtered = orders.filter((order) => {
        const remainingDays = calculateRemainingDays(order.deadline);
        return remainingDays <= filterDays;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [filterDays, orders]);

  const toggleExpanded = (orderId: string) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (newExpandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId);
    } else {
      newExpandedOrders.add(orderId);
    }
    setExpandedOrders(newExpandedOrders);
  };

  const handleStatusChange = async (orderId: string, newStatus: string, version: number) => {
    try {
      await changeStatus({ orderId, newStatus, version }).unwrap();
      refetch();
      toast.success('更新订单状态成功');
    } catch (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setCurrentPage(1);
  }

  return (
    <div className="overflow-x-auto">
      <FilterSection filterDays={filterDays} onFilterChange={handleFilterChange} />
      <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">客户</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">电话</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">地址</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">交货日期</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden sm:table-cell">创建时间</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onToggleExpanded={toggleExpanded}
              onViewProductDetails={(product) => setSelectedProduct(product)}
              isExpanded={expandedOrders.has(order._id)}
              handleStatusChange={handleStatusChange}
              isUpdating={isUpdating}
              calculateRemainingDays={calculateRemainingDays}
              getRowClassName={getRowClassName}
            />
          ))}
        </tbody>
      </table>
      <ProductDetailsModal
        selectedProduct={selectedProduct}
        onClose={handleClose}
        setCurrentPage={setCurrentPage}
        data={data}
        isSuccess={isSuccess}
        currentPage={currentPage}
        isProductLoading={isProductLoading}
      />
    </div>
  );
};

export default OrderTable;
