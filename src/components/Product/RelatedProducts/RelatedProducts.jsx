import React from 'react';
import { Typography, Box } from '@mui/material';
import CardProduct from '@/components/Shop/CardProduct/CardProduct';

export default function RelatedProducts() {
  return (
    <Box component={'section'}>
        <Typography fontSize={{xs: "30px"}} fontWeight={'bold'}>
                You may also like this
        </Typography>
        <Box mt={{xs:4}} display={'grid'} gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'} gap={2}>
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
        </Box>
    </Box>
  )
}
