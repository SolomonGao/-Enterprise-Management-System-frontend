import React from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useTheme } from 'next-themes';

type RootMaterial = {
  idroot_material: string;
  root_name: string;
}

type DropdownProps = {
  options: RootMaterial[];
  value: string;
  onChange: (value: string) => void;
  disableAll: boolean
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, disableAll }) => {
  const { theme } = useTheme();

  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
      <InputLabel id="dropdown-label" sx={{ color: theme === 'dark' ? 'white' : 'black' }}>
        零件分类
      </InputLabel>
      <Select
        labelId="dropdown-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="零件分类"
        sx={{
          backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
          color: theme === 'dark' ? 'white' : 'black',
          '& fieldset': {
            borderColor: theme === 'dark' ? 'white' : 'grey',
          },
          '&:hover fieldset': {
            borderColor: theme === 'dark' ? '#335B8C' : 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: theme === 'dark' ? '#fff' : '#335B8C',
          },
        }}
      >
        {/* 添加"全部"选项 */}
          <MenuItem key="all" value="">
            全部
          </MenuItem>


        {options.map((option) => (
          <MenuItem key={option.idroot_material} value={option.idroot_material}>
            {option.root_name}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};

export default Dropdown;
