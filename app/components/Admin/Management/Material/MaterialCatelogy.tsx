import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useUpdateMaterialCountsMutation } from "@/redux/features/material/materialApi";
import ImageModal from "../../ImageModal";

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

type Props = {
  materials: Material[];
  handleUpdateCounts: (id: string, counts: number) => void;
};

const MaterialCatelogy: React.FC<Props> = ({ materials, handleUpdateCounts }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editCounts, setEditCounts] = useState<{ [key: string]: string }>({}); // 用于存储临时输入的数量
  const [updateCounts] = useUpdateMaterialCountsMutation();

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (materials.length === 0) {
    return <div className="text-gray-500 text-center">没有找到匹配的材料</div>;
  }

  const handleInputChange = (id: string, value: string) => {
    setEditCounts((prev) => ({ ...prev, [id]: value }));
  };


  const handleUpdateCounts1 = async (id: string) => {
    const newCounts = parseInt(editCounts[id], 10);
    if (!isNaN(newCounts) && newCounts >= 0) {
      try {
        await updateCounts({ id, counts: newCounts }).unwrap();
        handleUpdateCounts(id, newCounts);
        toast.success("数量更新成功！");

      } catch (error) {
        toast.error(`更新失败，请重试！, ${error}`);
      }
      setEditCounts((prev) => ({ ...prev, [id]: "" })); // 清空输入框
    } else {
      toast.error("请输入有效的数量！");
    }
  };

  return (
    <div>

      {/* 图片模态框 */}
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      {/* 材料列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((material) => (
          <div
            key={material.drawing_no_id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col"
          >
            {/* 列表头 */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {material.name}
              </div>
              {/* 小屏幕显示展开按钮 */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">
                  数量: {material.counts}
                </span>
                <button
                  onClick={() => toggleExpand(material.drawing_no_id)}
                  className="text-blue-600 dark:text-blue-400 md:hidden"
                >
                  {expandedIds.includes(material.drawing_no_id) ? "收起" : "展开"}
                </button>
              </div>
            </div>

            {/* 展开详情 */}
            <div
              className={`mt-4 space-y-2 ${expandedIds.includes(material.drawing_no_id) || "md:block hidden"
                }`}
            >
              <p className="text-gray-900 dark:text-gray-300">
                图纸号(ID): {material.drawing_no_id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                所属产品: {material.model_name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                原料种类: {material.row_materials}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                规格: {material.specification}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                备注: {material.comments || "无"}
              </p>
              {/* 图片展示 */}
              {material.drawing_no_secure_url !== "" && (
                <div
                  className="relative w-full h-48 mt-2 rounded-md overflow-hidden cursor-pointer"
                  onClick={() =>
                    setSelectedImage(`${material.drawing_no_secure_url}`)
                  }
                >
                  <Image
                    src={material.drawing_no_secure_url}
                    alt={`${material.name}-图纸`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {/* 修改数量区域 */}
              <div className="mt-4">
                <input
                  type="number"
                  min="0"
                  value={editCounts[material.drawing_no_id] || ""}
                  onChange={(e) =>
                    handleInputChange(material.drawing_no_id, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入新的数量"
                />
                <button
                  onClick={() => handleUpdateCounts1(material.drawing_no_id)}
                  className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  更新数量
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialCatelogy;
