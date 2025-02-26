import { Order } from '@/app/utils/types';
import React, { FC, useState } from 'react';
import { format } from 'date-fns';
import { useChangeStatusMutation, useRestoreInventoryMutation } from '@/redux/features/order/orderApi';
import { toast } from 'react-hot-toast';
import EditOrderModal from './EditOrderModal';

type Props = {
    orders: Order[];
    refetch: () => void;
    user: any;
}

const EditOrderTable: FC<Props> = ({ orders, refetch, user }) => {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [hideCompleted, setHideCompleted] = useState(false);
    const [changeStatus] = useChangeStatusMutation();
    const [restoreInventory] = useRestoreInventoryMutation();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = async (orderId: string, newStatus: string, version: number) => {
        try {
            const order = orders.find(o => o._id === orderId);
            
            await changeStatus({ orderId, newStatus, version }).unwrap();
            toast.success('订单状态更新成功');
            refetch();
        } catch (error) {
            toast.error('更新失败');
            console.error('更新订单状态失败:', error);
        }
    };

    const formatDate = (date: string) => {
        return format(new Date(date), 'yyyy-MM-dd');
    };

    const calculateRemainingDays = (deadline: string) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredOrders = hideCompleted 
        ? orders.filter(order => order.status !== 'completed')
        : orders;

    const getStatusOptions = (currentStatus: string) => {
        if (currentStatus === "初始" || currentStatus === "准备配件中") {
            return ["初始", "准备配件中"];
        }
        if (currentStatus === "待发货" || currentStatus === "发货中") {
            return ["待发货", "发货中"];
        }
        return ["已完成"];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "初始":
                return "bg-gray-100 text-gray-800";
            case "准备配件中":
                return "bg-blue-100 text-blue-800";
            case "待发货":
                return "bg-yellow-100 text-yellow-800";
            case "发货中":
                return "bg-purple-100 text-purple-800";
            case "已完成":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="toggleShowCompleted"
                            checked={hideCompleted}
                            onChange={(e) => setHideCompleted(e.target.checked)}
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
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">客户</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">电话</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">地址</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">交货日期</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">备注</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">创建时间</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
                            <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order: Order) => (
                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.customer}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.phoneNumber}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.address}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{formatDate(order.deadline)}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.comments}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{formatDate(order.createdAt)}</td>

                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                    {calculateRemainingDays(order.deadline)}
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(order)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        编辑
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value, order.__v)}
                                        className="px-2 py-1 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        {getStatusOptions(order.status).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedOrder(null);
                    }}
                    refetch={refetch}
                />
            )}
        </>
    );
};

export default EditOrderTable;