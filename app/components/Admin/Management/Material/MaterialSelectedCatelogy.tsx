import { style } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import ImageModal from '../../ImageModal';
import toast from 'react-hot-toast';

type Material = {
    drawing_no_id: string;
    name: string;
    specification: string;
    drawing_no_secure_url: string;
};

type UsedMaterials = {
    id: string;
    quantity: number;
    drawing_no_id: string;
};

type Props = {
    materials: Material[];
    selectedMaterialsId: UsedMaterials[];
    setSelectedMaterialsId: (selectedMaterialsId: UsedMaterials[] | ((prev: UsedMaterials[]) => UsedMaterials[])) => void;
};

const MaterialSelectedCatelogy: FC<Props> = ({ materials, selectedMaterialsId, setSelectedMaterialsId }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // 图片模态框
    const openImageModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleCheckboxChange = (material: Material, checked: boolean) => {
        setSelectedMaterialsId((prev: UsedMaterials[]) => {
            if (checked) {
                const newSelected = prev.find((item) => item.id === material.drawing_no_id);
                if (newSelected) {
                    return prev;
                }
                return [...prev, { 
                    id: material.drawing_no_id, 
                    quantity: 1, 
                    drawing_no_id: material.drawing_no_id 
                }];
            } else {
                return prev.filter((item) => item.id !== material.drawing_no_id);
            }
        });
        toast.success(`${checked ? '添加' : '移除'}零件成功`);
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) {
            toast.error('数量必须大于0');
            return;
        }

        setSelectedMaterialsId((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
        toast.success('数量更新成功');
    };

    return (
        <div className="overflow-x-auto shadow-lg border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                <thead>
                    <tr className="bg-blue-300 dark:bg-gray-700">
                        <th className={style.tableHead}>选择</th>
                        <th className={style.tableHead}>零件名称</th>
                        <th className={style.tableHead}>图号ID</th>
                        <th className={style.tableHead}>规格</th>
                        <th className={style.tableHead}>数量</th>
                        <th className={style.tableHead}>图纸</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material) => {
                        const selectedItem = selectedMaterialsId.find(item => item.id === material.drawing_no_id);
                        return (
                            <tr key={material.drawing_no_id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="border border-black dark:border-white px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedItem}
                                        onChange={(e) => handleCheckboxChange(material, e.target.checked)}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                </td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.name}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.drawing_no_id}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.specification}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">
                                    {selectedItem ? (
                                        <input
                                            type="number"
                                            min="1"
                                            inputMode="numeric"
                                            step="1"
                                            placeholder="数量"
                                            value={selectedItem.quantity || ""}
                                            onChange={(e) =>
                                                handleQuantityChange(material.drawing_no_id, Number(e.target.value))
                                            }
                                            className="w-16 bg-white dark:bg-gray-800 appearance-none text-center border rounded px-2 py-1"
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td
                                    className="px-4 py-2 text-center cursor-pointer hover:text-blue-500"
                                    onClick={() => material.drawing_no_secure_url && openImageModal(material.drawing_no_secure_url)}
                                >
                                    {material.drawing_no_secure_url ? "查看图纸" : "/"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* 图片模态框 */}
            <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};

export default MaterialSelectedCatelogy;