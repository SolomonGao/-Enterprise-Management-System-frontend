'use client';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';
import { useAddMaterialMutation, useAddRootMutation } from '@/redux/features/material/materialApi';
import Dropdown from './Dropdown';
import ImageUpload from '@/app/components/ImageUpload';

type Material = {
  model_name: string;
  name: string;
  row_materials: string;
  comments: string;
  counts: number;
  specification: string;
  drawing_no_id: string;
  drawing_no: { file: string | null; fileType: string };
  root_materials_idroot_materials: string;
  [key: string]: any;
};

type RootMaterial = {
  idroot_material: string;
  root_name: string;
}

type Props = {
  options: RootMaterial[];
  setAdded: (added: boolean) => void;
};

const AddRootMaterial: React.FC<Props> = ({ options, setAdded }) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ file: string | null; fileType: string }>({
    file: null, // 默认值为空
    fileType: '', // 默认文件类型为空字符串
  });
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [operation, setOperation] = useState('category');
  const [materialName, setMaterialName] = useState('');
  const [materialDetails, setMaterialDetails] = useState<Partial<Material> & { [key: string]: any }>({
    model_name: '',
    name: '',
    row_materials: '',
    comments: '',
    counts: 0,
    specification: '',
    drawing_no_id: '',
    drawing_no: { file: null, fileType: "" }, // Ensure this is valid
    root_materials_idroot_materials: '',
  });
  
  const { theme } = useTheme();
  const [addRoot, { isSuccess, error }] = useAddRootMutation();
  const [addMaterial, { isSuccess: isSuccessLeaf, error: errorLeaf }] = useAddMaterialMutation();

  useEffect(() => {
    if (isSuccessLeaf) {
      toast.success('原料添加成功');
      setAdded(true);
      // 清空所有原料相关字段
      setMaterialDetails({
        model_name: '',
        name: '',
        row_materials: '',
        comments: '',
        counts: 0,
        specification: '',
        drawing_no_id: '',
        drawing_no: { file: null, fileType: "" },
        root_materials_idroot_materials: '',
      });
      setSelectedImage({ file: null, fileType: '' });
      setSelectedCategory(''); // 重置分类
      setLoading(false); // 请求完成后解除加载状态
    }
    if (errorLeaf) {
      console.log(errorLeaf);
      toast.error("添加失败");
      setLoading(false); // 请求完成后解除加载状态
    }

  }, [isSuccessLeaf, errorLeaf])

  useEffect(() => {
    if (isSuccess) {
      toast.success('分类添加成功');
      setAdded(true);
      setLoading(false); // 请求完成后解除加载状态
      setMaterialName(''); // 清空分类名称
    }

    if (error) {
      console.log(error);
      toast.error("添加失败");
      setLoading(false);
    }
  }, [isSuccess, error])


  const handleAdd = async () => {
    setLoading(true); // 设置加载状态
    if (operation === 'category') {
      await addRoot(materialName);
    } else {

      if (selectedCategory === "") {
        toast.error('必须选择一个原料类型');
        setLoading(false);
        return
      }

      if (!materialDetails.name || !materialDetails.drawing_no_id || Number.isNaN(materialDetails.counts)) {
        toast.error('名称，型号和数量是必填项');
        setLoading(false);
        return;
      }
      materialDetails.root_materials_idroot_materials = selectedCategory;
      if (selectedImage) {
        materialDetails.drawing_no = selectedImage;
      }
      await addMaterial(materialDetails);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 p-3 rounded-full bg-teal-400 dark:bg-blue-600 hover:bg-teal-600 dark:hover:bg-blue-800"
      >
        <AiOutlinePlus size={32} />
      </button>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <Box
            sx={{
              position: 'relative',
              p: 3,
              bgcolor: theme === 'dark' ? '#111827' : 'white',
              borderRadius: 2,
              maxWidth: "1300px",
              maxHeight: "80vh",   // 控制对话框高度
              overflowY: "auto"    // 添加垂直滚动条
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <IoClose size={20} className='dark:text-white text-black' />
            </IconButton>

            <Typography variant="h6" mb={2} color={theme === 'dark' ? 'white' : 'black'}>
              添加{operation === 'category' ? '分类' : '原料'}
            </Typography>

            {/* 下拉选择操作 */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="dropdown-label" sx={{ color: theme === 'dark' ? 'white' : 'black' }}>操作</InputLabel>
              <Select
                value={operation}
                label="操作"
                onChange={(e) => setOperation(e.target.value)}
                sx={{
                  backgroundColor: theme === "dark" ? "#1F2937" : "white",
                  color: theme === "dark" ? "white" : "black",
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "white" : "black",  // 控制标签颜色
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme === "dark" ? "#1F2937" : "white",
                    color: theme === "dark" ? "white" : "black",
                    "& fieldset": {
                      borderColor: theme === "dark" ? "white" : "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "#335B8C" : "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "dark" ? "#fff" : "#335B8C",
                    },
                  },
                }}
              >
                <MenuItem value="category">添加分类</MenuItem>
                <MenuItem value="material">添加原料</MenuItem>
              </Select>
            </FormControl>

            {operation === 'category' ? (
              <TextField
                fullWidth
                label="分类名称"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                sx={{
                  backgroundColor: theme === "dark" ? "#1F2937" : "white",
                  color: theme === "dark" ? "white" : "black",
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "white" : "black",  // 控制标签颜色
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme === "dark" ? "#1F2937" : "white",
                    color: theme === "dark" ? "white" : "black",
                    "& fieldset": {
                      borderColor: theme === "dark" ? "white" : "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "#335B8C" : "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "dark" ? "#fff" : "#335B8C",
                    },
                  },
                }}

              />
            ) : (
              <>
                {/* 分类下拉菜单 */}
                <div className="mt-5">
                  <Dropdown
                    options={options}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    disableAll={true}
                  />
                </div>
                {["drawing_no_id", "name", "counts", "comments", "model_name", "specification", "row_material"].map((field, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    type={field === "counts" ? "number" : "text"}  // 对数量输入框添加 type="number"
                    label={
                      field === "drawing_no_id"
                        ? "型号"
                        : field === "name"
                          ? "零配件名称"
                          : field === "counts"
                            ? "数量"
                            : field === "model_name"
                              ? "产品名称"
                              : field === "row_material"
                                ? "材料类型"
                                : field === "specification"
                                  ? "规格" : "备注"
                    }
                    value={materialDetails[field]}
                    onChange={(e) => {
                      const value = field === "counts" ? parseInt(e.target.value, 10) : e.target.value;
                      setMaterialDetails({ ...materialDetails, [field]: value });
                    }}
                    sx={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "white",
                      color: theme === "dark" ? "white" : "black",
                      mt: 2,
                      mb: 1,
                      "& .MuiInputLabel-root": {
                        color: theme === "dark" ? "white" : "black",  // 控制标签颜色
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme === "dark" ? "#1F2937" : "white",
                        color: theme === "dark" ? "white" : "black",
                        "& fieldset": {
                          borderColor: theme === "dark" ? "white" : "grey",
                        },
                        "&:hover fieldset": {
                          borderColor: theme === "dark" ? "#335B8C" : "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme === "dark" ? "#fff" : "#335B8C",
                        },
                      }
                    }}
                  />
                ))}
                <ImageUpload onImageUpload={(file, fileType) => setSelectedImage({ file, fileType })} small={true} selectedImage={selectedImage} />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleAdd}
              sx={{ mt: 2 }}
            >
              添加
            </Button>
          </Box>
        </div>
      )}
      <div>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Typography variant="h6" className='dark:text-white text-black'>
              正在添加，请稍候...
            </Typography>
          </div>
        )}

      </div>
    </div >
  );
};

export default AddRootMaterial;
