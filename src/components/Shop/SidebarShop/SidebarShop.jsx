import React from 'react';
import { Box, Divider } from '@mui/material';
import SearchBar from '../Widgets/SearchBar/SearchBar';
import ProductCategories from '../Widgets/ProductCategories/ProductCategories';
import FilterByPrice from '../Widgets/FilterByPrice/FilterByPrice';

export default function SidebarShop() {
  return (
    <Box>
        <SearchBar />
        <Divider sx={{margin: '20px 0px'}}/>
        <ProductCategories />
        <Divider sx={{margin: '20px 0px'}}/>
        <FilterByPrice />
    </Box>
  )
}
