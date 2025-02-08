import { Purchasing } from '@/app/utils/types';
import React, { FC } from 'react'

type Props = {
    purchasings: Purchasing[];
    refetch: () => void;
    user: any;
};

const PurchasingTable: FC<Props> = ({ purchasings, refetch, user }) => {
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
            <table className="min-w-full table-auto border-separate border-spacing-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                    <tr>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">授权人</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">零配件名称</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium ">采购数量</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">创建时间</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">截止日期</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">状态</th>
                        <th className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium">操作者</th>
                    </tr>
                </thead>
                <tbody>
                    {purchasings.map((purchasing) => {
                        const formattedDate = formatDate(purchasing.createdAt)
                        const createdDate = new Date(purchasing.createdAt);
                        createdDate.setDate(createdDate.getDate() + parseInt(purchasing.orderDeadline));
                        const deadline = formatDate(createdDate.toString());
                        return (
                            <tr key={purchasing._id} className="border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.authorizer}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.material.name}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.material.purchasedQuantity}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{formattedDate}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{deadline}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.status}</td>
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-300 font-medium hidden md:table-cell">{purchasing.operator}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PurchasingTable