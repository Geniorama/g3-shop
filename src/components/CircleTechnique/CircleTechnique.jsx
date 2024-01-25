import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

export default function CircleTechnique({title, color, image}) {
  const imageExample = 'https://images.unsplash.com/photo-1495846414472-6696652d955f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Box sx={{textAlign: 'center'}}>
        <Box sx={{
            position: 'relative', 
            width: '100%', 
            aspectRatio: '1', 
            borderRadius: '50%',
            backgroundColor: 'white',
            // overflow: 'hidden', 
            border: '2px solid', 
            borderColor: color, 
            boxSizing: 'border-box'
            }}>
            <Image unoptimized alt='' fill style={{objectFit: 'cover', transform: 'scale(.9)', borderRadius: '50%'}} src={image ? image : imageExample} />
        </Box>
        <Stack spacing={1} marginTop={'10px'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
          <Box 
            component={'span'}
            sx={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              backgroundColor: color,
              borderRadius: '50%'
            }}
            >

          </Box>
          <Typography component={'p'}>
              {title}
          </Typography>
        </Stack>
    </Box>
  )
}
