import React from "react";
import { Box, Divider, Typography, Slider, Stack } from "@mui/material";
import SearchBar from "../Widgets/SearchBar/SearchBar";
import ProductCategories from "../Widgets/ProductCategories/ProductCategories";
import type { Collection } from "shopify-buy";
import { useState } from "react";

type SidebarShopProps = {
  categories?: Collection[];
  onPriceChange: (priceRange: [number, number]) => void;
};

export default function SidebarShop({
  categories,
  onPriceChange,
}: SidebarShopProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as [number, number];
    setPriceRange(value);
    onPriceChange(value);
  };

  return (
    <Box>
      <SearchBar />
      <Divider sx={{ margin: "20px 0px" }} />
      <ProductCategories categories={categories} />
      <Divider sx={{ margin: "20px 0px" }} />
      <Box>
        <Typography fontWeight={"600"} component={"h5"} variant="h6">
          Filter By Price
        </Typography>
        <Stack>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={1000}
            step={10}
          />
          <Typography>
            Price range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
