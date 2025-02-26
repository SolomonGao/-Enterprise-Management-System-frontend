// components/OrderTable.tsx
import React, { FC, useState, useEffect, useMemo } from 'react';
import FilterSection from './FilterSection';
import OrderRow from './OrderRow';
import ProductDetailsModal from './ProductDetailsModal';
import MaterialCheckModal from './MaterialCheckModal';
import { Order, Product } from '../../../../../utils/types';
import { useChangeStatusMutation, useLazyGetRequiredMaterialsQuery, useUpdateRequiredMaterialsMutation } from '@/redux/features/order/orderApi';
import { usePurchasingMaterialMutation } from '@/redux/features/pruchasing/purchasingApi';
import { toast } from 'react-hot-toast';
import { Typography } from '@mui/material';
import { useLazyGetMaterialsByProductQuery } from '@/redux/features/product/productApi';
import { useLogger } from '@/hooks/useLogger';

type Props = {
  orders: Order[];
  refetch: () => void;
  user: any;
};

const TruncatedText: FC<{ text: string; maxLength: number }> = ({ text, maxLength }) => {
  const truncated = text.slice(0, maxLength);
  const remaining = text.slice(maxLength);

  return (
    <div className="relative group">
      <span>{truncated}{remaining && '...'}</span>
      {remaining && (
        <div className="absolute left-0 top-full mt-1 p-2 bg-white dark:bg-gray-800 border rounded shadow-lg 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {text}
        </div>
      )}
    </div>
  );
};

const OrderTable: FC<Props> = ({ orders, refetch, user }) => {
  // 状态管理
  const [filterDays, setFilterDays] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProductLoading, setIsProductLoading] = useState(false);

  // API hooks
  const [changeStatus, { isLoading: isUpdating }] = useChangeStatusMutation();
  const [triggerGetMaterials, { isSuccess: getMatSucc, isLoading, error: errorReq }] = useLazyGetRequiredMaterialsQuery();
  const [updateRequiredMaterials, { isSuccess: succUse, error: errUse }] = useUpdateRequiredMaterialsMutation();
  const [purchasingMaterial, { isSuccess: succPurchase, error: errorPurchase }] = usePurchasingMaterialMutation();
  const [triggerGetMaterialsByP, { data, isSuccess, error }] = useLazyGetMaterialsByProductQuery();

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const { logAction } = useLogger();

  // 错误处理函数
  const handleError = (error: any, defaultMessage: string) => {
    if ("data" in error) {
      toast.error(error.data.message);
    } else {
      console.error(defaultMessage, error);
    }
  };

  // 获取物料信息
  const handleGetMaterials = async (order: Order) => {
    try {
      setSelectedOrder(order);
      const response = await triggerGetMaterials({ materials: order.requiredMaterials });
      setMaterials(response.data.data);
      setIsModalOpen(true);
    } catch (err) {
      handleError(err, "获取物料信息失败");
    }
  };

  // 确认生产
  const handleConfirmProduction = async () => {
    if (!selectedOrder) return;
    try {
      const materialResponse = await updateRequiredMaterials({ materials });
      if (materialResponse?.data.success) {
        await handleStatusChange(selectedOrder._id, '待发货', selectedOrder.__v);
        
        // 记录日志
        await logAction({
          action: 'UPDATE',
          targetType: 'ORDER',
          targetId: selectedOrder._id,
          details: `确认生产${selectedOrder.customer}的订单并更新物料库存. ID: ${selectedOrder._id}`,
          oldData: { materials: selectedOrder.requiredMaterials },
          newData: { materials }
        });

        setIsModalOpen(false);
        toast.success('更新成功');
      }
    } catch (error) {
      handleError(error, "确认生产失败");
    }
  };

  // 状态更改处理
  const handleStatusChange = async (orderId: string, newStatus: string, version: number) => {
    try {
      const order = orders.find(o => o._id === orderId);
      await changeStatus({ orderId, newStatus, version }).unwrap();
      
      await logAction({
        action: 'UPDATE',
        targetType: 'ORDER',
        targetId: orderId,
        details: `订单状态从 "${order?.status}" 更改为 "${newStatus}"`,
        oldData: { status: order?.status },
        newData: { status: newStatus }
      });

      refetch();
      toast.success('更新订单状态成功');
    } catch (error) {
      handleError(error, "更新状态失败");
    }
  };

  // 采购物料
  const handlePurchasingMaterial = async (id: string, number: number, version: number, orderDeadline: number, price: number) => {
    try {
      await purchasingMaterial({ id, number, price, version, orderDeadline });
    } catch (err) {
      handleError(err, "采购物料失败");
    }
  };

  // 计算剩余天数
  const calculateRemainingDays = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const todayDate = new Date(today);
    return Math.ceil((deadlineDate.getTime() - todayDate.getTime()) / (1000 * 3600 * 24));
  };

  // 获取行样式
  const getRowClassName = (remainingDays: number) => {
    if (remainingDays <= 0) return 'text-red-800 font-semibold';
    if (remainingDays < 10) return 'text-orange-600 font-semibold';
    if (remainingDays < 30) return 'text-yellow-400 font-semibold';
    return 'text-gray-800 dark:text-gray-300';
  };

  // 过滤订单
  const filteredOrders = useMemo(() => {
    if (!showCompleted) {
      orders = orders.filter(order => order.status !== "已完成");
    }
    if (filterDays !== null) {
      return orders.filter(order => calculateRemainingDays(order.deadline) <= filterDays);
    }
    return orders;
  }, [filterDays, orders, showCompleted]);

  // 副作用处理
  useEffect(() => {
    if (selectedProduct?.id) {
      triggerGetMaterialsByP({ idProduct: selectedProduct.id, page: currentPage });
    }
    if (selectedOrder) {
      triggerGetMaterials({ materials: selectedOrder.requiredMaterials });
    }
  }, [selectedProduct, currentPage, selectedOrder, succPurchase, triggerGetMaterials, triggerGetMaterialsByP]);

  useEffect(() => {
    if (succPurchase) toast.success("添加成功");
  }, [succPurchase]);

  useEffect(() => {
    if (isSuccess) setIsProductLoading(false);
  }, [isSuccess]);

  // 错误处理副作用
  useEffect(() => {
    if (error) handleError(error, "获取材料失败");
  }, [error]);

  useEffect(() => {
    if (errorReq) handleError(errorReq, "获取所需材料失败");
  }, [errorReq]);

  useEffect(() => {
    if (errUse) handleError(errUse, "更新所需材料失败");
  }, [errUse]);

  useEffect(() => {
    if (errorPurchase) handleError(errorPurchase, "采购失败");
  }, [errorPurchase]);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <FilterSection filterDays={filterDays} onFilterChange={(e) => setFilterDays(e.target.value ? parseInt(e.target.value) : null)} />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="toggleShowCompleted"
            checked={!showCompleted}
            onChange={() => setShowCompleted(prev => !prev)}
            className="w-4 h-4 text-[#37a39a] border-gray-300 rounded focus:ring-[#37a39a]"
          />
          <label htmlFor="toggleShowCompleted" className="ml-2 text-gray-800 dark:text-gray-300">
            隐藏已完成订单
          </label>
        </div>
      </div>

      <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">订单号</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">客户</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">电话</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">地址</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">交货日期</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">备注</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">创建时间</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">订单单价</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium ">装配出货</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <OrderRow
              key={order._id}
              order={{
                ...order,
                _id: <TruncatedText text={order._id} maxLength={3} />,
                customer: <TruncatedText text={order.customer} maxLength={5} />,
                comments: <TruncatedText text={order.comments} maxLength={4} />,
                address: <TruncatedText text={order.address} maxLength={5} />,
                deadline: <TruncatedText text={order.deadline} maxLength={10} />,
                createdAt: <TruncatedText text={order.createdAt} maxLength={5} />,
                _raw: {
                  _id: order._id,
                  deadline: order.deadline,
                  createdAt: order.createdAt,
                  customer: order.customer,
                  comments: order.comments,
                  address: order.address,
                  price: order.price
                }
              }}
              onToggleExpanded={() => {
                const newExpandedOrders = new Set(expandedOrders);
                if (newExpandedOrders.has(order._id)) {
                  newExpandedOrders.delete(order._id);
                } else {
                  newExpandedOrders.add(order._id);
                }
                setExpandedOrders(newExpandedOrders);
              }}
              onViewProductDetails={setSelectedProduct}
              isExpanded={expandedOrders.has(order._id)}
              handleStatusChange={handleStatusChange}
              isUpdating={isUpdating}
              calculateRemainingDays={calculateRemainingDays}
              getRowClassName={getRowClassName}
              handleGetMaterials={handleGetMaterials}
              isLoading={isLoading}
              showCompleted={showCompleted}
            />
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <ProductDetailsModal
          selectedProduct={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setCurrentPage(1);
          }}
          setCurrentPage={setCurrentPage}
          data={data}
          isSuccess={isSuccess}
          currentPage={currentPage}
          isProductLoading={isProductLoading}
          user={user}
          handlePurchasingMaterial={handlePurchasingMaterial}
        />
      )}

      {isModalOpen && (
        <MaterialCheckModal
          materials={materials}
          onConfirm={handleConfirmProduction}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
          user={user}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Typography variant="h6" className="text-white">
            加载中...
          </Typography>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
