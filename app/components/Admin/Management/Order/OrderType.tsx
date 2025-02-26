'use client'
import React, { FC, useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    active: number;
    setActive: (active: number) => void;
    nextButton: () => void;
    setOrderType: (type: 'product' | 'material') => void;
}

const OrderType: FC<Props> = ({ active, setActive, nextButton, setOrderType }) => {
    const [selectedType, setSelectedType] = useState<'product' | 'material' | null>(null);

    const handleNext = () => {
        if (!selectedType) {
            toast.error('请选择订单类型');
            return;
        }
        setOrderType(selectedType);
        nextButton();
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 产品订单选项 */}
                <div
                    onClick={() => setSelectedType('product')}
                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedType === 'product'
                            ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        产品订单
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        创建包含完整产品的订单
                    </p>
                </div>

                {/* 材料订单选项 */}
                <div
                    onClick={() => setSelectedType('material')}
                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedType === 'material'
                            ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        材料订单
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        创建仅包含材料的订单
                    </p>
                </div>
            </div>

            {/* 按钮区域 */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    下一步
                </button>
            </div>
        </div>
    )
}

export default OrderType