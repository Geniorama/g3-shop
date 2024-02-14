import React from 'react'
import { Box, Grid, Container, Typography, Card, useTheme, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cards from '@/assets/img/25415479_3.png';
import Image from 'next/image';
import Astronaut from '@/assets/img/astronauta-banner.svg';



export default function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const theme = useTheme();

  const defaultImage = Cards.src;

  return (
    <>
      <Slider style={{marginTop: '60px'}} {...settings}>
        <Box sx={{backgroundColor: theme.palette.primary.main}}>
          <Container>
            <Grid container spacing={{xs:0, md:5}} alignItems={'center'}>
              <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} xs={12} lg={6} sx={{minHeight: '80vh'}} item>
                <Image data-aos="fade-left" src={Astronaut} alt='' width={200} height={200} />
                <Typography fontSize={'20px'} fontWeight={'bold'} color={'secondary'}> New promo</Typography>
                <Typography fontSize={{xs: '50px', md: '80px'}} fontWeight={'bold'} lineHeight={'1em'} color={'white'}> BUSINESS CARDS</Typography>
                <Typography fontSize={'15px'} color={'#f4f4f4'} mt={3}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id excepturi neque eos fuga sunt rerum nemo perspiciatis iste? Fugiat libero ullam recusandae nisi quam corrupti in odit praesentium repellat.
                </Typography>
                <Box mt={{xs: 3}}>
                  <Button href='/product' variant='contained' color='secondary'>
                      BUY NOW
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <img src={defaultImage} alt="" style={{width: '100%'}}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Slider>
    </>
  )
}
