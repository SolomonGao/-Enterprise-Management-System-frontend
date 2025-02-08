import { Purchasing } from '@/app/utils/types';
import React, { FC } from 'react'

type Props = {
    purchasings: Purchasing[];
    refetch: () => void;
    user: any;
};

const PurchasingTable: FC<Props> = ({ purchasings, refetch, user }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                    <tr>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">授权人</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">剩余天数</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium ">采购数量</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作者</th>
                    </tr>
                </thead>
                <tbody>
                    {purchasings.map((purchasing) => (
                        <tr key={purchasing._id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.authorizer}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.material.name}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.orderDeadline}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.material.purchasedQuantity}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.status}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.operator}</td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
    )
}

export default PurchasingTable