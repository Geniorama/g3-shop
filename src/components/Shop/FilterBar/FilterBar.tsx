import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Grid, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type FilterBarProps = {
  totalProducts: number;
  filteredProductsCount: number;
  productsPerPage: number;
  currentPage: number;
  onSortChange: (option: string) => void;
};

export default function FilterBar({
  totalProducts,
  filteredProductsCount,
  productsPerPage,
  currentPage,
  onSortChange
}: FilterBarProps) {
  const [sortValue, setSortValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSortValue(value);
    onSortChange(value);
  };

  const start = (currentPage - 1) * productsPerPage + 1;
  const end = Math.min(currentPage * productsPerPage, filteredProductsCount);

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ backgroundColor: "#fafafa", padding: "1em" }}
    >
      <Grid item>
        <Typography>
          Showing {start}-{end} of {filteredProductsCount} results
        </Typography>
      </Grid>
      <Grid item>
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <Select
              value={sortValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
               <MenuItem value="">
                Sort Filtering
              </MenuItem>
              <MenuItem value="title-asc">Title: A - Z</MenuItem>
              <MenuItem value="title-desc">Title: Z - A</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
