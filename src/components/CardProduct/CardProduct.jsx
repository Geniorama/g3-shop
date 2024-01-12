import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CardProduct.module.css';

export default function CardProduct() {
  return (
    <Box className={styles.CardProduct}>
        <Box sx={{
            width:'100%',
            height:'40vh',
            position: 'relative',
            borderRadius: '15px',
            overflow: 'hidden'
        }}>
            <Image fill style={{objectFit: 'cover'}} alt='' src={'https://images.unsplash.com/photo-1525299374597-911581e1bdef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
        </Box>
        <Box sx={{textAlign: 'center', padding: '1.5em'}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '20px'}} component={'h3'}>
                Custom T-shirt
            </Typography>
            <Typography color={'secondary'} component={'span'} sx={{fontSize: '15px'}}>
                $20.00
            </Typography>
        </Box>
    </Box>
  )
}
