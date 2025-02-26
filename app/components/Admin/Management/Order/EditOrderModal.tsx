import { Order } from '@/app/utils/types';
import React, { FC, useState } from 'react';
import { useUpdateOrderMutation, useRestoreInventoryMutation } from '@/redux/features/order/orderApi';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { useLogger } from '@/hooks/useLogger';

type Props = {
    order: Order;
    onClose: () => void;
    refetch: () => void;
}

const EditOrderModal: FC<Props> = ({ order, onClose, refetch }) => {
    const [updateOrder] = useUpdateOrderMutation();
    const [restoreInventory] = useRestoreInventoryMutation();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { logAction } = useLogger();
    const [orderInfo, setOrderInfo] = useState({
        customer: order.customer,
        phoneNumber: order.phoneNumber,
        address: order.address,
        deadline: format(new Date(order.deadline), 'yyyy-MM-dd'),
        comments: order.comments,
        price: order.price,
        status: order.status
    });

    type OrderInfoKeys = keyof typeof orderInfo;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    const handleConfirm = async () => {
        try {
            const changes: Record<string, { old: any; new: any }> = {};
            Object.keys(orderInfo).forEach(key => {
                const typedKey = key as OrderInfoKeys;
                if (orderInfo[typedKey] !== order[typedKey]) {
                    changes[typedKey] = {
                        old: order[typedKey],
                        new: orderInfo[typedKey]
                    };
                }
            });

            // 如果需要恢复库存
            if (
                (orderInfo.status === "初始" || orderInfo.status === "准备配件中") && 
                (order.status === "待发货" || order.status === "发货中" || order.status === "已完成")
            ) {
                await restoreInventory({
                    orderId: order._id,
                }).unwrap();

                // 记录恢复库存的操作
                await logAction({
                    action: 'UPDATE',
                    targetType: 'MATERIAL',
                    targetId: order._id,
                    details: `恢复订单${order._id}相关库存`,
                    oldData: { status: order.status },
                    newData: { status: orderInfo.status }
                });
            }
            
            await updateOrder({
                orderId: order._id,
                orderInfo,
                version: order.__v
            }).unwrap();

            // 记录订单更新操作
            const changeDetails = Object.entries(changes)
                .map(([field, value]) => `${field}: ${value.old} -> ${value.new}`)
                .join(', ');

            await logAction({
                action: 'UPDATE',
                targetType: 'ORDER',
                targetId: order._id,
                details: `更新订单信息: ${changeDetails}`,
                oldData: order,
                newData: orderInfo
            });
            
            toast.success('订单更新成功');
            refetch();
            onClose();
        } catch (error) {
            // 记录错误
            await logAction({
                action: 'UPDATE',
                targetType: 'ORDER',
                targetId: order._id,
                details: '更新订单失败',
                oldData: order,
                newData: orderInfo
            });
            
            toast.error('更新失败');
        } finally {
            setShowConfirmDialog(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "初始":
                return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
            case "准备配件中":
                return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800";
            case "待发货":
                return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800";
            case "发货中":
                return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-800";
            case "已完成":
                return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
        }
    };

    const inputClassName = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 dark:text-white text-black">编辑订单</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                客户名称
                            </label>
                            <input
                                type="text"
                                value={orderInfo.customer}
                                onChange={(e) => setOrderInfo({...orderInfo, customer: e.target.value})}
                                className={inputClassName}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                联系电话
                            </label>
                            <input
                                type="text"
                                value={orderInfo.phoneNumber}
                                onChange={(e) => setOrderInfo({...orderInfo, phoneNumber: e.target.value})}
                                className={inputClassName}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                地址
                            </label>
                            <input
                                type="text"
                                value={orderInfo.address}
                                onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                                className={inputClassName}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                交货日期
                            </label>
                            <input
                                type="date"
                                value={orderInfo.deadline}
                                onChange={(e) => setOrderInfo({...orderInfo, deadline: e.target.value})}
                                className={inputClassName}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                价格
                            </label>
                            <input
                                type="number"
                                value={orderInfo.price}
                                onChange={(e) => setOrderInfo({...orderInfo, price: Number(e.target.value)})}
                                className={inputClassName}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                状态
                            </label>
                            <select
                                value={orderInfo.status}
                                onChange={(e) => setOrderInfo({...orderInfo, status: e.target.value})}
                                className={inputClassName}
                            >
                                <option value="初始">初始</option>
                                <option value="准备配件中">准备配件中</option>
                                <option value="待发货">待发货</option>
                                <option value="发货中">发货中</option>
                                <option value="已完成">已完成</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-black">
                                备注
                            </label>
                            <textarea
                                value={orderInfo.comments}
                                onChange={(e) => setOrderInfo({...orderInfo, comments: e.target.value})}
                                rows={3}
                                className={inputClassName}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            保存
                        </button>
                    </div>
                </form>
            </div>

            {/* 确认对话框 */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 dark:text-white text-black">确认更新</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            确定要更新此订单吗？
                            {(orderInfo.status === "初始" || orderInfo.status === "准备配件中") && 
                             (order.status === "待发货" || order.status === "发货中" || order.status === "已完成") && (
                                <span className="block mt-2 text-yellow-600 dark:text-yellow-400">
                                    注意：此操作将恢复相关库存！
                                </span>
                            )}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirmDialog(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                确认
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditOrderModal; 