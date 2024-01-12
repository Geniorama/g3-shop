import React from 'react';
import Banner from '../../../public/img/desktop-product-cards-25.webp';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Astro from '../../../public/img/astro 3d 1.webp';
import Link from '@mui/material';

export default function BannerPromo() {
  return (
    <Box component={'section'} sx={{
        width: '100%',
        backgroundImage: `url(${Banner.src})`,
        backgroundRepeat: 'no-repeat',
        padding: '3rem 0'
        }}>
        <Container sx={{position: 'relative', zIndex: '2'}}>
            <Grid container spacing={15} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} lg={6}>
                    <Image alt='' width={'100%'} height={'100%'} style={{objectFit: 'contain'}} src={Astro} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{color: 'white'}}>
                        <Typography
                            sx={{
                                fontSize: '120px',
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                lineHeight: '1em'
                            }}
                            >
                            READY
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '30px',
                                lineHeight: '1em',
                                marginBottom: '1em'
                            }}
                            >
                            for a cosmic Digital Marketing journey?
                        </Typography>
                        <Typography sx={{fontSize: '20px'}}>
                            Join us, and togetherwe&apos;ll conquer the digital galaxy.
                        </Typography>
                        <Button variant='contained' sx={{marginTop: '2em'}} color='secondary'>
                            Explore Now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
