import React from 'react';
import { Box, Typography, Card, Stack, Link } from '@mui/material';
import Image from 'next/image';
import ExampleImage from '../../../../public/img/example-cat.png';

export default function CardCategory({name, href, image}) {
  return (
    <Card sx={{padding: '2rem'}}>
        <Stack direction={'row'} alignItems={'flex-end'}>
            <Box sx={{width: '50%'}}>
                <Typography component={'span'} color={'secondary'} sx={{fontWeight: 'bold', fontSize: '14px'}}>
                    G3 Print
                </Typography>
                <Typography component={'h3'} sx={{fontWeight: 'bold', margin: '10px 0', lineHeight: '1.2em'}} variant='h4'>
                    {name ? name : 'Category name'}
                </Typography>
                <Link href={href ? href : '/'} sx={{fontWeight: 'bold', fontSize: '14px'}}>
                   Explore products 
                </Link>
            </Box>
            <Box sx={{width: '50%', height: '200px', position: 'relative'}}>
                <Image unoptimized style={{objectFit: 'contain'}} fill src={image ? image : ExampleImage} alt='' />
            </Box>
        </Stack>
    </Card>
  )
}
