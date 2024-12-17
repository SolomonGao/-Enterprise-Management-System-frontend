import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

type ImageUploadProps = {
  onImageUpload: (file: string | null, fileType: string) => void; // 增加 fileType 参数
  small: boolean;
  selectedImage: any;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, small, selectedImage }) => {
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = async (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    await handleImageChange(e, true, file);

  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, drag: boolean, draggedFile: any) => {
    let file;
    if (drag === false) {
      file = e.target.files?.[0];
    }
    else {
      file = draggedFile;
    }


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
        };
        reader.readAsDataURL(file); // 读取文件为 Base64 格式
      } else {
        // 图片文件处理逻辑
        reader.onloadend = () => {
          const base64String = reader.result as string; // Base64 编码后的图片
          onImageUpload(base64String, file.type); // 将 Base64 和文件类型传递给父组件
        };
        reader.readAsDataURL(file); // 读取文件为 Base64 格式
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input
        type="file"
        id="file"
        accept="image/*,application/pdf"
        onChange={(e) => handleImageChange(e, false, null)}
        style={{ marginBottom: '10px' }}
        className='hidden'
      />
      <label htmlFor='file'
        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage.file ? (
          (
            <div style={{ position: 'relative', width: small ? '300px' : '800px', height: small ? '200px' : '600px' }}>
              <Image
                src={selectedImage.file}
                alt="缩略图(PDF不支持缩略图)"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: '8px' }}
              />
            </div>)
        ) : (<span className='text-black dark:text-white'> 拖动或者点击上传需要保存的图片 </span>)}
      </label>
    </div>
  );
};

export default ImageUpload;
