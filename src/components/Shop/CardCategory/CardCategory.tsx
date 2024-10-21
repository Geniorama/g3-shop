import React from 'react';
import { Box, Typography, Card, Stack, Link } from '@mui/material';
import Image from 'next/image';
import ExampleImage from '../../../../public/img/example-cat.png';

export type CardCategoryProps = {
    titleSmall?: string; 
    title?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function CardCategory({titleSmall, title, buttonLink, buttonText, image}:CardCategoryProps) {
  return (
    <Card sx={{padding: '2rem'}}>
        <Stack direction={{xs: 'column-reverse' , lg: 'row'}} alignItems={{lg: 'flex-end'}}>
            <Box sx={{width: {lg: '50%'}}}>
                <Typography component={'span'} color={'secondary'} sx={{fontWeight: 'bold', fontSize: '14px'}}>
                    {titleSmall}
                </Typography>
                <Typography component={'h3'} sx={{fontWeight: 'bold', margin: '10px 0', lineHeight: '1.2em', fontSize: {xs: '28px', lg: '35px'}}} variant='h4'>
                    {title}
                </Typography>
                <Link href={buttonLink} sx={{fontWeight: 'bold', fontSize: '14px'}}>
                   {buttonText}
                </Link>
            </Box>
            <Box sx={{width: '50%', height: '200px', position: 'relative'}}>
                {image && (
                    <Image unoptimized style={{objectFit: 'contain'}} fill src={image} alt='' />
                )}
            </Box>
        </Stack>
    </Card>
  )
}
