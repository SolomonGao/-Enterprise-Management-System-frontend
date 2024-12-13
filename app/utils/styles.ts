// styles.ts
import { SxProps } from '@mui/material';

export const getInputFieldStyles = (theme: string): SxProps => ({
  backgroundColor: theme === "dark" ? "#1F2937" : "white",
  color: theme === "dark" ? "white" : "black",
  "& .MuiInputLabel-root": {
    color: theme === "dark" ? "white" : "black",
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
});
