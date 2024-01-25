import React from 'react'
import { Box, Grid, Container, Typography, Card, useTheme } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cards from '../../../public/img/25415479_3.png';
import Image from 'next/image';
import Astronaut from '../../../public/img/astronauta-banner.svg';


export default function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const theme = useTheme();

  return (
    <>
      <Slider {...settings}>
        <Box sx={{backgroundColor: theme.palette.primary.main}}>
          <Container>
            <Grid container spacing={5} alignItems={'center'}>
              <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} xs={12} lg={6} sx={{padding: '3rem 0', minHeight: '80vh'}} item>
                <Image data-aos="fade-left" src={Astronaut} alt='' width={200} height={200} />
                <Typography fontSize={'20px'} fontWeight={'bold'} color={'secondary'}> New promo</Typography>
                <Typography fontSize={'80px'} fontWeight={'bold'} lineHeight={'1em'} color={'white'}> BUSINESS CARDS</Typography>
                <Typography fontSize={'15px'} color={'#f4f4f4'} mt={3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id excepturi neque eos fuga sunt rerum nemo perspiciatis iste? Fugiat libero ullam recusandae nisi quam corrupti in odit praesentium repellat.
                </Typography>
              </Grid>
              <Grid item>
                <Image src={Cards} alt='' width={'500'} style={{maxWidth:'100%'}} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        <Box>
          <Container>
            <Grid container spacing={5} alignItems={'center'}>
              <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} xs={12} lg={6} sx={{padding: '3rem 0', minHeight: '80vh'}} item>
                <Image src={Astronaut} alt='' width={200} height={200} />
                <Typography fontSize={'20px'} fontWeight={'bold'} color={'secondary'}> New promo</Typography>
                <Typography fontSize={'80px'} fontWeight={'bold'} lineHeight={'1em'} color={'primary'}> BUSINESS CARDS</Typography>
                <Typography fontSize={'15px'} color={'gray'} mt={3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id excepturi neque eos fuga sunt rerum nemo perspiciatis iste? Fugiat libero ullam recusandae nisi quam corrupti in odit praesentium repellat.
                </Typography>
              </Grid>
              <Grid item>
                <Image src={Cards} alt='' width={'500'} style={{maxWidth:'100%'}} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Slider>
    </>
  )
}
