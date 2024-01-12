import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

export default function CircleTechnique() {
  const theme = useTheme()
  return (
    <Box sx={{textAlign: 'center'}}>
        <Box sx={{
            position: 'relative', 
            width: '100%', 
            aspectRatio: '1', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '2px solid', 
            borderColor: theme.palette.secondary.main, 
            boxSizing: 'border-box',
            // '&:before':{
            //     position: 'absolute',
            //     content: '""',
            //     width: '30px',
            //     height: '30px',
            //     background: 'red',
            //     bottom: '0',
            //     left: '25%'
            // }
            }}>
            <Image alt='' fill style={{objectFit: 'cover', transform: 'scale(.8)', borderRadius: '50%'}} src={'https://images.unsplash.com/photo-1495846414472-6696652d955f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        </Box>
        <Typography sx={{marginTop: '20px'}} component={'p'}>
            Embroidery
        </Typography>
    </Box>
  )
}
