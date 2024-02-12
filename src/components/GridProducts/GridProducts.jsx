import React from 'react'
import { Grid, Box, Pagination, Stack } from '@mui/material';
import CardProduct from '@/components/Shop/CardProduct/CardProduct';

export default function GridProducts() {
  return (
    <>
    <Box display={'grid'} gridTemplateColumns={"repeat(auto-fill, minmax(min(250px, 100%), 1fr))"} gap={3}>
        <Box>
          <CardProduct />
        </Box>
        <Box>
          <CardProduct />
        </Box>
        <Box>
          <CardProduct />
        </Box>
        <Box>
          <CardProduct />
        </Box>
        <Box>
          <CardProduct />
        </Box>
        <Box>
          <CardProduct />
        </Box>

        <Box>
          <CardProduct />
        </Box>

        <Box>
          <CardProduct />
        </Box>
    </Box>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={5}>
      <Pagination count={10} />
    </Box>
    </>
  )
}
