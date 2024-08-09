import React from 'react';
import Banner from '@/assets/img/desktop-product-cards-25.webp';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Astro from '@/assets/img/astro-3d.webp';

export default function BannerPromo() {
  return (
    <Box component={'section'} sx={{
        width: '100%',
        backgroundImage: `url(${Banner.src})`,
        backgroundRepeat: 'no-repeat',
        padding: '3rem 0'
        }}>
        <Container sx={{position: 'relative', zIndex: '2'}}>
            <Grid container spacing={{xs:3, lg:15}} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} lg={6}>
                   <img src={Astro.src} alt="" style={{width: '100%'}} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{color: 'white'}} textAlign={{xs: 'center', lg: 'left'}}>
                        <Typography
                            sx={{
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                lineHeight: '1em'
                            }}
                            fontSize={{xs: '90px', lg: '120px'}}
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
                        <Button href='https://g3marketingdigital.com/' target='_blank' variant='contained' sx={{marginTop: '2em'}} color='secondary'>
                            Explore Now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
