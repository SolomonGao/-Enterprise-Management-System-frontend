// components/OrderTable.tsx
import React, { FC, useState, useEffect, useMemo } from 'react';
import FilterSection from './FilterSection';
import OrderRow from './OrderRow';
import ProductDetailsModal from './ProductDetailsModal';
import { Order, Product } from '../../../../../utils/types';
import { useChangeStatusMutation, useLazyGetRequiredMaterialsQuery, useUpdateRequiredMaterialsMutation } from '@/redux/features/order/orderApi';
import toast from 'react-hot-toast';
import { useGetMaterialsByProductQuery, useLazyGetMaterialsByProductQuery } from '@/redux/features/product/productApi';
import MaterialCheckModal from './MaterialCheckModal';
import { useSelector } from 'react-redux';
import { usePurchasingMaterialMutation } from '@/redux/features/pruchasing/purchasingApi';

type Props = {
  orders: Order[];
  refetch: () => void;
  user: any;
};

const OrderTable: FC<Props> = ({ orders, refetch, user }) => {

  const [filterDays, setFilterDays] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(true); // 控制是否显示已完成订单

  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const today = new Date().toISOString().split('T')[0];

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [changeStatus, { isLoading: isUpdating }] = useChangeStatusMutation();
  const [triggerGetMaterials, { isSuccess: getMatSucc, isLoading, error: errorReq }] = useLazyGetRequiredMaterialsQuery();
  const [updateRequiredMaterials, { isSuccess: succUse, error: errUse }] = useUpdateRequiredMaterialsMutation();
  const [purchasingMaterial, { isSuccess: succPurchase, error: errorPurchase }] = usePurchasingMaterialMutation()

  const [isProductLoading, setIsProductLoading] = useState(false); // 新增 loading 状态
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerGetMaterialsByP, { data, isSuccess, error }] = useLazyGetMaterialsByProductQuery();
  // const { data: newData, isSuccess: isSuccessNew, error: ca} = useGetMaterialsByProductQuery(
  //   {
  //     idProduct: selectedProduct?.id || "",
  //     page: currentPage,
  //   },
  //   { skip: !selectedProduct?.id }
  // );

  useEffect(() => {
    // 每当 selectedProduct 改变时，重新触发查询
    if (selectedProduct?.id) {
      triggerGetMaterialsByP({ idProduct: selectedProduct?.id, page: currentPage })
    }
    if (selectedOrder !== null) {
      triggerGetMaterials({ materials: selectedOrder.requiredMaterials })
    }
  }, [selectedProduct, succPurchase]);


  useEffect(() => {
    if (succPurchase) {
      toast.success("添加成功")
    } 
  }, [succPurchase])

  useEffect(() => {
    if (errorPurchase) {
      if ("data" in errorPurchase) {
        const errorPurchaseData = errorPurchase as any;
        toast.error(errorPurchaseData.data.message);
      } else {
        console.log("An error occured: ", errorPurchase);
      }
    }
  })
  // useEffect(() => {
  //   if (succUse) {
  //     getMaterialRefetch()
  //   }
  // })


  const handlePurchasingMaterial = async (id: string, number: number, version: number, orderDeadline: number) => {
    try {
      const response = await purchasingMaterial({ id, number, version, orderDeadline });
    } catch (err: any) {
      toast.error(err.message);
    }

  }

  const handleToggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  // 获取物料信息
  const handleGetMaterials = async (order: Order) => {
    try {
      setSelectedOrder(order);
      const response = await triggerGetMaterials({ materials: order.requiredMaterials });
      setMaterials(response.data.data);
      setIsModalOpen(true);
    } catch (err: any) {
      toast.error(err.message)
    }
  };

  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 确认后更新状态为生产中
  const handleConfirmProduction = async () => {
    if (!selectedOrder) return;
    try {
      // 第一个操作: 执行所需材料更新
      const materialResponse = await updateRequiredMaterials({ materials });

      if (materialResponse && materialResponse.data.success) {
        // 如果更新成功，继续执行第二个操作: 更新订单状态
        await handleStatusChange(selectedOrder._id, '待发货', selectedOrder.__v);

        // 关闭模态框
        setIsModalOpen(false);
      } else {
        // 处理更新失败的情况
        console.error('改变状态失败失败');
      }
    } catch (error) {
      // 处理错误
      console.error('发生错误:', error);
    }
  };


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

  useEffect(() => {
    if (errorReq) {
      if ("data" in errorReq) {
        const errorData = errorReq as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured: ", errorReq);
      }
    }
  }, [errorReq]);

  useEffect(() => {
    if (errUse) {
      if ("data" in errUse) {
        const errorData = errUse as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured: ", errUse);
      }
    }
  }, [errUse]);

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
    if (remainingDays <= 0) {
      return 'text-red-800 font-semibold'; // 橙色预警
    } else if (remainingDays < 30 && remainingDays >= 10) {
      return 'text-yellow-400 font-semibold'; // 黄色预警
    } else if (remainingDays < 10) {
      return 'text-orange-600 font-semibold';
    }
    return 'text-gray-800 dark:text-gray-300'; // 默认样式
  };
  // 使用 useMemo 缓存过滤后的订单
  const filteredOrders = useMemo(() => {
    if (filterDays !== null) {
      return orders.filter((order) => {
        const remainingDays = calculateRemainingDays(order.deadline);
        return remainingDays <= filterDays;
      });
    }
    return orders;
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
      <div className="flex items-center justify-between mb-4">
        <FilterSection filterDays={filterDays} onFilterChange={handleFilterChange} />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="toggleShowCompleted"
            checked={!showCompleted}
            onChange={handleToggleShowCompleted}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="toggleShowCompleted" className="ml-2 text-gray-800 dark:text-gray-300">
            隐藏已完成订单
          </label>
        </div>
      </div>
      <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">客户</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">电话</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">地址</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">交货日期</th>
            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">创建时间</th>
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
              order={order}
              onToggleExpanded={toggleExpanded}
              onViewProductDetails={(product) => setSelectedProduct(product)}
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
      <ProductDetailsModal
        selectedProduct={selectedProduct}
        onClose={handleClose}
        setCurrentPage={setCurrentPage}
        data={data}
        isSuccess={isSuccess}
        currentPage={currentPage}
        isProductLoading={isProductLoading}
        user={user}
        handlePurchasingMaterial={handlePurchasingMaterial}
      />
      <>
        {isModalOpen && (
          <MaterialCheckModal
            materials={materials}
            onConfirm={handleConfirmProduction}
            onClose={() => setIsModalOpen(false)}
            isLoading={isLoading}
            user={user}
          />
        )}
      </>
    </div>
  );
};

export default OrderTable;
