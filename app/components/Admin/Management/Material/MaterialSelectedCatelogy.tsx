import { style } from '@/app/styles/style';
import React, { FC } from 'react'
import ImageModal from '../../ImageModal';


type Material = {
    model_name: string;
    name: string;
    row_materials: string;
    comments: string;
    counts: number;
    specification: string;
    drawing_no_id: string; // 主键
    root_materials_idroot_materials: number;
    drawing_no_secure_url: string; // Base64 编码的图片或文件
};

type UsedMaterial = {
    id: string;
    quantity: number;
};

type Props = {
    materials: Material[];
    selectedMaterialsId: UsedMaterial[];
    setSelectedMaterialsId: (selectedMaterialsId: UsedMaterial[] | ((prev: UsedMaterial[]) => UsedMaterial[])) => void;
    setSelectedImage: (selectedImage: string | null) => void;
    selectedImage: string | null;
}

const MaterialSelectedCatelogy: FC<Props> = ({ materials, selectedMaterialsId, setSelectedMaterialsId, setSelectedImage, selectedImage }) => {

      // 图片模态框
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedMaterialsId((prev: UsedMaterial[]) => {
            if (checked) {
                const newSelected = prev.find((item) => item.id === id);
                if (newSelected) {
                    return prev;
                }
                return [...prev, { id, quantity: 1 }];
            } else {
                return prev.filter((item) => item.id !== id);
            }
        });
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        setSelectedMaterialsId((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <div className="overflow-x-auto shadow-lg border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                <thead>
                    <tr className="bg-blue-300 dark:bg-gray-700">
                        <th className={style.tableHead}>选择</th>
                        <th className={style.tableHead}>零配件型号</th>
                        <th className={style.tableHead}>零配件名称</th>
                        <th className={style.tableHead}>所属产品</th>
                        <th className={style.tableHead}>规格</th>
                        <th className={style.tableHead}>仓库</th>
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
                                        onChange={(e) => handleCheckboxChange(material.drawing_no_id, e.target.checked)}
                                    />
                                </td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.drawing_no_id}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.name}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.model_name}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.specification}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">{material.counts}</td>
                                <td className="border border-black dark:border-white px-4 py-2 text-center">
                                    {selectedItem ? (
                                        <input
                                            type="number"
                                            min="0"
                                            inputMode="numeric"
                                            step="1"
                                            placeholder="数量"
                                            value={selectedItem.quantity || ""}
                                            onChange={(e) =>
                                                handleQuantityChange(material.drawing_no_id, Number(e.target.value))
                                            }
                                            className="w-16 bg-white dark:bg-gray-800 appearance-none text-center"
                                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }} // 移除输入框默认上下箭头
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td
                                    className="border border-black dark:border-white px-4 py-2 text-center cursor-pointer"
                                    onClick={() => openImageModal(material.drawing_no_secure_url)}
                                >
                                    {material.drawing_no_secure_url ? "查看图纸" : "/"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    )
}

export default MaterialSelectedCatelogy