import { Purchasing } from '@/app/utils/types';
import React, { FC, useEffect, useState } from 'react'
import PurchasingRow from './PurchasingRow';
import { useFinishPurchasingMaterialMutation, useStartPurchasingMaterialMutation } from '@/redux/features/pruchasing/purchasingApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useLogger } from '@/hooks/useLogger';

type Props = {
    purchasings: Purchasing[];
    refetch: () => void;
    user: any;
};

const PurchasingTable: FC<Props> = ({ purchasings, refetch, user }) => {
    const [startPurchasingMaterial, { isSuccess, isLoading, error }] = useStartPurchasingMaterialMutation();
    const [finishPurchasingMaterial, { isSuccess: finishSucc, isLoading: finishIsL, error: finishErr }] = useFinishPurchasingMaterialMutation();
    const [showCompleted, setShowCompleted] = useState(true);
    const { logAction } = useLogger();

    const handleToggleShowCompleted = () => {
        setShowCompleted((prev) => !prev);
    };

    const handlePurchasing = async (purchasing: Purchasing) => {
        try {
            await startPurchasingMaterial({
                _id: purchasing._id,
                operator: user.name,
                __v: purchasing.__v
            }).unwrap();

            await logAction({
                action: 'UPDATE',
                targetType: 'PURCHASING',
                targetId: purchasing._id,
                details: `开始采购物料: ${purchasing.material.name}`,
                oldData: { status: purchasing.status },
                newData: { status: '采购中', operator: user.name }
            });

        } catch (err: any) {
            await logAction({
                action: 'UPDATE',
                targetType: 'PURCHASING',
                targetId: purchasing._id,
                details: `开始采购失败: ${err.message}`,
                oldData: purchasing,
                newData: null
            });
            toast.error(err.message);
        }
    }

    const handleFinishPurchasing = async (purchasing: Purchasing) => {
        try {
            await finishPurchasingMaterial({
                _id: purchasing._id,
                operator: user.name,
                drawing_no_id: purchasing.material.drawing_no_id,
                purchasedQuantity: purchasing.material.purchasedQuantity,
                __v: purchasing.__v,
            }).unwrap();

            await logAction({
                action: 'UPDATE',
                targetType: 'PURCHASING',
                targetId: purchasing._id,
                details: `完成采购物料: ${purchasing.material.name}, 数量: ${purchasing.material.purchasedQuantity}`,
                oldData: { status: purchasing.status },
                newData: { 
                    status: '已完成', 
                    operator: user.name,
                    purchasedQuantity: purchasing.material.purchasedQuantity 
                }
            });

        } catch (err: any) {
            await logAction({
                action: 'UPDATE',
                targetType: 'PURCHASING',
                targetId: purchasing._id,
                details: `完成采购失败: ${err.message}`,
                oldData: purchasing,
                newData: null
            });
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("采购状态更改为采购中")
        }
    }, [isSuccess]);

    useEffect(() => {
        if (finishSucc) {
            refetch()
            toast.success("采购完成！")
        }
    }, [finishSucc]);

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
        if (finishErr) {
            if ("data" in finishErr) {
                const finishErrData = finishErr as any;
                toast.error(finishErrData.data.message);
            } else {
                console.log("An error occured: ", finishErr);
            }
        }
    }, [finishErr]);

    const formatDate = (isoDateString: string) => {
        const date = new Date(isoDateString);

        // 提取日月年
        const day = String(date.getUTCDate()).padStart(2, '0'); // 日
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月
        const year = date.getUTCFullYear(); // 年

        // 提取时分秒
        const hours = String(date.getUTCHours()).padStart(2, '0'); // 时
        const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // 分
        const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // 秒

        // 组合成目标格式
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
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
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">授权人</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">图号</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium ">采购数量</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">创建时间</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">截止日期</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作者</th>
                    </tr>
                </thead>
                <tbody>
                    {purchasings.map((purchasing) => (
                        <PurchasingRow
                            key={purchasing._id}
                            formatDate={formatDate}
                            purchasing={purchasing}
                            handlePurchasing={handlePurchasing}
                            handleFinishPurchasing={handleFinishPurchasing}
                            showCompleted={showCompleted}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PurchasingTable