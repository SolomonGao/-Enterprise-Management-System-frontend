import { Order } from '@/app/utils/types';
import React, { FC, useState } from 'react'

type Props = {
      orders: Order[];
      refetch: () => void;
      user: any;
}

const EditOrderTable: FC<Props> = ({ orders, refetch, user }) => {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleSelectOrder = (order: Order) => {
      setSelectedOrderId(order._id);
    };

  return (
    <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="toggleShowCompleted"
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
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">电话</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">地址</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium ">交货日期</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">创建时间</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">产品</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {purchasings.map((purchasing) => (
                        <PurchasingRow
                            key={purchasing._id}
                            formatDate={formatDate}
                            purchasing={purchasing}
                            handlePurchasing={handlePurchasing}
                            handleFinishPurchasing={handleFinishPurchasing}
                            showCompleted={showCompleted}
                        />
                    ))} */}
                </tbody>
            </table>
        </div>
  );
};

export default EditOrderTable