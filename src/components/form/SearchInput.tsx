import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInput-root": {
    color: theme.palette.grey[50],
  },
  "& label": {
    color: theme.palette.grey[50],
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.light,
  },
  "& .MuiInput-root.Mui-focused .MuiInputAdornment-root": {
    color: theme.palette.primary.light,
  },
  "& .MuiInput-underline::before": {
    borderBottomColor: theme.palette.grey[50],
  },
  "& .MuiInput-underline::after": {
    borderBottomColor: theme.palette.primary.light,
  },
  "& .MuiInput-underline:not(.Mui-disabled):hover::before": {
    borderBottomColor: theme.palette.grey[50],
  },
}));

const SearchInput = ({
  searchHandler,
  label,
  placeholder,
  variant = "standard",
  ...props
}: SearchInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchHandler(event.target.value);
  };

  return (
    <StyledTextField
      id="search"
      label={label}
      type="search"
      variant={variant}
      size="small"
      margin="dense"
      InputProps={{
        placeholder: placeholder,
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              color: "grey.50",
            }}
          >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      {...props}
    />
  );
};

interface SearchInputProps {
  searchHandler: Function;
  label?: string;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined";
}

export default SearchInput;
