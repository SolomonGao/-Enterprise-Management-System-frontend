import React from "react";
import Image from "next/image";

type ImageModalProps = {
  imageUrl: string | null;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        {/* 关闭按钮 */}
        <button
          className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full z-10"
          onClick={onClose}
        >
          ✕
        </button>
        {/* 显示图片 */}
        <Image
          src={imageUrl}
          alt="大图"
          fill
          className="w-full h-full object-contain rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

export default ImageModal;
