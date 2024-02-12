import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CardProduct.module.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CardProduct({dataProduct}) {

  const dataExample = {
    image: 'https://images.unsplash.com/photo-1525299374597-911581e1bdef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Custom T-shirt',
    sale_price: '20',
    normal_price: '30',
    type: 'variable'
  }
  
  return (
    <Box data-aos="fade-up" className={styles.CardProduct}>
        <Box sx={{
            width:'100%',
            height:'40vh',
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden'
        }}>
            <Stack spacing={1} sx={{position: 'relative', zIndex: '2'}} direction={'row'} padding={1}>
                <Chip color={'secondary'} label="Sale" />
                <Chip color='primary' label="Sale" />
                <Chip color='primary' label="Sale" />
            </Stack>
            <Link href={'/product'}>
                <Image unoptimized fill style={{objectFit: 'cover'}} alt='' src={dataProduct ? dataProduct.image : dataExample.image} />
            </Link>
        </Box>
        <Box sx={{textAlign: 'center', padding: '1.5em'}}>
            <Link href={'/product'} style={{textDecoration: 'none', color: 'unset'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: '20px'}} component={'h3'}>
                    {dataProduct ? dataProduct.title :  dataExample.title}
                </Typography>
            </Link>
            {dataProduct && (
                dataProduct.type == 'variable' && (
                    <Typography color={'gray'} fontSize={'12px'}>
                        from
                    </Typography>
                )
            )}
                        
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <Typography color={'gray'} component={'span'} sx={{fontSize: '15px', textDecoration: 'line-through'}}>
                    $30.00
                </Typography>
                <Typography color={'secondary'} component={'span'} sx={{fontSize: '15px'}}>
                    $20.00
                </Typography>
            </Stack>
        </Box>
    </Box>
  )
}
