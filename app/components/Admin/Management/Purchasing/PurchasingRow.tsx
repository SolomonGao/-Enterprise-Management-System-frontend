import { Purchasing } from '@/app/utils/types'
import React, { FC, useEffect, useState } from 'react'

type Props = {
    formatDate: (createdAt: string) => string;
    purchasing: Purchasing;
    handlePurchasing: (purchasing: Purchasing) => void;
    handleFinishPurchasing: (purchasing: Purchasing) => void;
    showCompleted: boolean;
}

const PurchasingRow: FC<Props> = ({
    formatDate,
    purchasing,
    handlePurchasing,
    handleFinishPurchasing,
    showCompleted,
}) => {

    const [isDone, setIsDone] = useState(purchasing.status === '已完成');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmDone, setShowConfirmDone] = useState(false);
    const [formattedDate, setFormattedDate] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleCancel = () => {
        setShowConfirm(false); // 隐藏模态框
    };

    const handleConfirm = () => {
        handlePurchasing(purchasing); // 调用状态更新函数
        setShowConfirm(false); // 隐藏模态框
      };

      const handleCancelDone = () => {
        setShowConfirmDone(false); // 隐藏模态框
    };

    const handleConfirmDone = () => {
        handleFinishPurchasing(purchasing); // 调用状态更新函数
        setShowConfirmDone(false); // 隐藏模态框
      };

    useEffect(() => {
        // 动态更新 isDone
        setIsDone(purchasing.status === '已完成');

        // 格式化创建日期和计算截止日期
        const formattedCreatedDate = formatDate(purchasing.createdAt);
        setFormattedDate(formattedCreatedDate);

        const createdDate = new Date(purchasing.createdAt);
        createdDate.setDate(createdDate.getDate() + parseInt(purchasing.orderDeadline));
        const formattedDeadline = formatDate(createdDate.toString());
        setDeadline(formattedDeadline);

    }, [purchasing, formatDate]); // 依赖项包括 purchasing 和 formatDate

    if (!showCompleted && isDone) {
        return null;
      }

    return (
        <>
            <tr className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.authorizer}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{purchasing.material.name}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{purchasing.material.drawing_no_id}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{purchasing.material.purchasedQuantity}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{formattedDate}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{deadline}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{purchasing.status}</td>

                {/* 完成、结束或出库按钮 */}
                {!isDone ? (
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">
                        {'采购中' === purchasing.status ? (
                            <button
                                onClick={() => setShowConfirmDone(true)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                            >
                                完成
                            </button>
                        ) : purchasing.status === "已完成" ? (
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
                                disabled
                            >
                                结束
                            </button>
                        ) : (
                            <button
                                onClick={() => { setShowConfirm(true) }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                            >
                                采购
                            </button>
                        )}
                    </td>
                ) : <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium"> 已完成</td>}
                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium md:table-cell">{purchasing.operator}</td>
            </tr>
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-11/12 max-w-lg">
                        <p className="text-gray-800 dark:text-gray-200 text-center text-lg font-semibold">
                            请确认是否已经开始采购
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={handleConfirm}
                                className="px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
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

            {showConfirmDone && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-11/12 max-w-lg">
                        <p className="text-gray-800 dark:text-gray-200 text-center text-lg font-semibold">
                            请确认采购是否已经完成
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={handleConfirmDone}
                                className="px-6 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                            >
                                确认
                            </button>
                            <button
                                onClick={handleCancelDone}
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
}

export default PurchasingRow;
