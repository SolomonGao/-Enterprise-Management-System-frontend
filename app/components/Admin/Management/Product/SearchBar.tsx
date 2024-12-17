// components/SearchBar.tsx
import React, { useState } from "react";
import { TextField, MenuItem, Button, Grid } from "@mui/material";
import { useTheme } from "next-themes";

const columnOptions = [
  { label: "产品ID", value: "idproduct" },
  { label: "模型名", value: "model_name" },
  { label: "泵型号", value: "pump_model" },
  { label: "图号ID", value: "drawing_no_id" },
  { label: "制造商", value: "manufacturer" },
];

type Filters = {
  searchBy: string;
  search?: string;
};

interface SearchBarProps {
  onSearch: (filters: Filters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme();
  const [selectedColumn, setSelectedColumn] = useState("idproduct");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filters: Filters = { searchBy: selectedColumn, search: searchTerm.trim() };
    onSearch(filters);
  };

  const handleReset = () => {
    setSelectedColumn("model_name");
    setSearchTerm("");
  };

  return (
    <Grid container spacing={2}>
      {/* 搜索列选择 */}
      <Grid item xs={12} sm={3} md={3}>
        <TextField
          select
          label="搜索列"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          fullWidth
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
          {columnOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* 搜索关键字 */}
      <Grid item xs={12} sm={9} md={9}>
        <TextField
          label="搜索关键字"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
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
      </Grid>

      {/* 搜索按钮 */}
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          onClick={handleSearch}
          fullWidth
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
          搜索
        </Button>
      </Grid>

      {/* 重置按钮 */}
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          onClick={handleReset}
          fullWidth
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
          重置
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
