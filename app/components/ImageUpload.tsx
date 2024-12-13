import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

type ImageUploadProps = {
  onImageUpload: (file: string | null, fileType: string) => void; // 增加 fileType 参数
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('只支持上传 JPEG、PNG、WEBP、PDF 格式的文件');
        return;
      }

      const reader = new FileReader();

      if (file.type === 'application/pdf') {
        // PDF 文件处理逻辑
        reader.onloadend = () => {
          const base64String = reader.result as string; // Base64 编码后的 PDF
          onImageUpload(base64String, file.type); // 将 Base64 和文件类型传递给父组件
          setPreviewUrl(null); // PDF 无法生成预览图，清空预览 URL
        };
        reader.readAsDataURL(file); // 读取文件为 Base64 格式
      } else {
        // 图片文件处理逻辑
        reader.onloadend = () => {
          const base64String = reader.result as string; // Base64 编码后的图片
          onImageUpload(base64String, file.type); // 将 Base64 和文件类型传递给父组件
          setPreviewUrl(base64String); // 生成图片预览
        };
        reader.readAsDataURL(file); // 读取文件为 Base64 格式
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleImageChange}
        style={{ marginBottom: '10px' }}
      />
      {previewUrl && (
        <div style={{ position: 'relative', width: '100px', height: '100px', marginTop: '10px' }}>
          <Image
            src={previewUrl}
            alt="Preview"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
