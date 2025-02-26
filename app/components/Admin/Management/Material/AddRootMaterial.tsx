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
import { useLogger } from '@/hooks/useLogger';
import { CircularProgress } from '@mui/material';

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
  refetch: () => void;
};

const AddRootMaterial: React.FC<Props> = ({ options, setAdded, refetch }) => {
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
  const { logAction } = useLogger();

  useEffect(() => {
    if (isSuccessLeaf) {
      toast.success('零件添加成功');
      refetch();
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
      refetch();
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
    setLoading(true);
    try {
      if (operation === 'category') {
        await addRoot(materialName).unwrap();
        
        // 添加分类操作日志
        await logAction({
          action: 'CREATE',
          targetType: 'MATERIAL',
          targetId: 'new_category',
          details: `创建新物料分类: ${materialName}`,
          oldData: null,
          newData: { categoryName: materialName }
        });
        
      } else {
        if (selectedCategory === "") {
          toast.error('必须选择一个零件类型');
          setLoading(false);
          return;
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

        await addMaterial(materialDetails).unwrap();
        
        // 添加零件操作日志
        await logAction({
          action: 'CREATE',
          targetType: 'MATERIAL',
          targetId: materialDetails.drawing_no_id,
          details: `创建新零件: ${materialDetails.name}, 型号: ${materialDetails.drawing_no_id}`,
          oldData: null,
          newData: materialDetails
        });
      }
    } catch (error: unknown) {
      // 记录错误日志
      await logAction({
        action: 'CREATE',
        targetType: 'MATERIAL',
        targetId: operation === 'category' ? 'new_category' : materialDetails.drawing_no_id || 'new_material',
        details: `创建${operation === 'category' ? '分类' : '零件'}失败: ${error instanceof Error ? error.message : '未知错误'}`,
        oldData: null,
        newData: operation === 'category' ? { categoryName: materialName } : materialDetails
      });
      console.error('Failed to add:', error);
      toast.error(`添加失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
    setLoading(false);
  };

  // 添加确认对话框
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleConfirmAdd = () => {
    setShowConfirmDialog(true);
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
              添加{operation === 'category' ? '分类' : '零件'}
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
                <MenuItem value="material">添加零件</MenuItem>
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
                        ? "型号（图号）"
                        : field === "name"
                          ? "零配件名称"
                          : field === "counts"
                            ? "数量"
                            : field === "model_name"
                              ? "所属产品名称"
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
              onClick={handleConfirmAdd}
              sx={{ mt: 2 }}
            >
              添加
            </Button>
          </Box>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center">
            <CircularProgress />
            <span className="mt-2 text-gray-700 dark:text-gray-200">
              {operation === 'category' ? '正在添加分类...' : '正在添加零件...'}
            </span>
          </div>
        </div>
      )}

      {/* 确认对话框 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">确认添加？</h3>
            <p>
              {operation === 'category' 
                ? `确定要添加分类 "${materialName}" 吗？`
                : `确定要添加零件 "${materialDetails.name}" 吗？`}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  handleAdd();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRootMaterial;
