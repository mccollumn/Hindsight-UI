import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({
  searchHandler,
  label,
  variant = "standard",
  ...props
}: SearchInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchHandler(event.target.value);
  };

  return (
    <TextField
      id="search"
      label={label}
      type="search"
      variant={variant}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
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
  label: string;
  variant?: "standard" | "filled" | "outlined";
}

export default SearchInput;
