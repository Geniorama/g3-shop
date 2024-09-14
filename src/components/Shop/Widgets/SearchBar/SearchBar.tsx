import React from "react";
import {
  TextField,
  FormControl,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleSearch = () => {
    if (searchText !== "") {
      router.push(`/search?q=${searchText}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <FormControl>
      <TextField
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleChange(e)}
        placeholder="Ingresa tu búsqueda"
        InputProps={{
          endAdornment: (
            <InputAdornment onClick={handleSearch} position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
