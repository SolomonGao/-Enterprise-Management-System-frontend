'use client';

import React, { useState } from "react";
import { TextField, MenuItem, Button, Grid } from "@mui/material";
import { useTheme } from "next-themes";
import {getInputFieldStyles} from "../../../../utils/styles"

const columnOptions = [
  { label: "模型名", value: "model_name" },
  { label: "名称", value: "name" },
  { label: "备注", value: "comments" },
  { label: "规格", value: "specification" },
  { label: "数量", value: "counts" },
];

type Filters = {
  searchBy: string;
  search?: string;
  countsRange?: string;
};

interface SearchBarProps {
  onSearch: (filters: Filters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme();

  const [selectedColumn, setSelectedColumn] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [countRange, setCountRange] = useState({ min: "", max: "" });

  const handleSearch = () => {
    const filters: Filters = { searchBy: selectedColumn };

    if (selectedColumn === "counts") {
      const min = countRange.min ? parseInt(countRange.min, 10) : 0;
      const max = countRange.max ? parseInt(countRange.max, 10) : undefined;

      if (min && max && min > max) {
        alert("最小值不能大于最大值！");
        return;
      }

      filters.countsRange = `${min}-${max || ""}`;
    } else {
      filters.search = searchTerm.trim();
    }

    onSearch(filters);
  };

  const handleReset = () => {
    setSelectedColumn("name");
    setSearchTerm("");
    setCountRange({ min: "", max: "" });
  };

  return (
    <Grid container spacing={2}>

      {/* 列选择下拉菜单 */}
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

      {/* 数量范围输入框 */}
      {selectedColumn === "counts" ? (
        <>
          <Grid item xs={6} sm={3}>
            <TextField
              label="最小值"
              type="number"
              value={countRange.min}
              onChange={(e) =>
                setCountRange({ ...countRange, min: e.target.value })
              }
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
          <Grid item xs={6} sm={3}>
            <TextField
              label="最大值"
              type="number"
              value={countRange.max}
              onChange={(e) =>
                setCountRange({ ...countRange, max: e.target.value })
              }
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
        </>
      ) : (
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
      )}

      {/* 搜索按钮 */}
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          onClick={handleSearch}
          fullWidth
          sx={{
            backgroundColor: theme === "dark" ? "#1F2937" : "white",
            color: theme === "dark" ? "white" : "black",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#155A9E" : "#1976D2",
            },
          }}
        >
          搜索
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          onClick={handleReset}
          fullWidth
          sx={{
            backgroundColor: theme === "dark" ? "#1F2937" : "white",
            color: theme === "dark" ? "white" : "black",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#155A9E" : "#1976D2",
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
