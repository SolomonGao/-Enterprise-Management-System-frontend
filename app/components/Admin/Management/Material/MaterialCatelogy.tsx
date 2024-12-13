import React, { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
};

const MaterialCatelogy: React.FC<Props> = ({ materials }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (materials.length === 0) {
    return <div className="text-gray-500 text-center">没有找到匹配的材料</div>;
  }

  return (
    <div>
      {/* 图片模态框 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full z-10"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            {/* <TransformWrapper>
  <TransformComponent>
    {selectedImage ? (
      <img
        src={selectedImage.startsWith('data:image') ? selectedImage : `https://res.cloudinary.com/YOUR_CLOUD_NAME/raw/${selectedImage}`}
        alt="大图"
        className="object-contain rounded-lg w-full h-auto"
      />
    ) : (
      <p>图片加载失败</p>
    )}
  </TransformComponent>
</TransformWrapper> */}
            <Image
              src={selectedImage}
              alt="大图"
              fill
              className="w-full h-full object-contain rounded-lg"
              priority
            />
          </div>


        </div>
      )}

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
              <p className="text-gray-700 dark:text-gray-300">
                所属产品: {material.model_name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                型号: {material.drawing_no_id}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialCatelogy;
