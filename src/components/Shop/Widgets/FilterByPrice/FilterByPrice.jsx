import React from 'react';
import { Box, Typography, Slider, Stack } from '@mui/material';

export default function FilterByPrice() {
  return (
    <Box>
        <Typography fontWeight={'600'} component={'h5'} variant='h6'>
            Filter By Price
        </Typography>
        <Stack>
            <Slider />
        </Stack>
    </Box>
  )
}
