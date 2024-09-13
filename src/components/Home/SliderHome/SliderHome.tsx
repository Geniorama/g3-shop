import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "@/assets/img/25415479_3.png";

export type Slide = {
  title: string,
  titleSmall: string,
  titleLarge: string,
  description: string,
  buttonText: string,
  buttonUrl: string,
  backgroundColor: string,
  imageUrl: string,
  imageAlignment: string,
  iconUrl: string
}

type SliderHomeProps = {
  slides: Slide[]
}

export default function SliderHome({ slides }:SliderHomeProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <Box key={i} sx={{ backgroundColor: slide.backgroundColor }}>
            <Container>
              <Grid container spacing={{ xs: 0, md: 5 }} alignItems={"center"}>
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  xs={12}
                  lg={6}
                  sx={{ height: "80vh", overflow: 'hidden' }}
                  item
                >
                  <img
                    data-aos="fade-left"
                    src={slide.iconUrl}
                    alt=""
                    width={200}
                  />
                  <Typography
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    color={"secondary"}
                  >
                    {" "}
                    {slide.titleSmall}
                  </Typography>
                  <Typography
                    fontSize={{ xs: "50px", md: "80px" }}
                    fontWeight={"bold"}
                    lineHeight={"1em"}
                    color={"white"}
                  >
                    {" "}
                    {slide.titleLarge}
                  </Typography>
                  <Typography fontSize={"15px"} color={"#f4f4f4"} mt={3}>
                    {slide.description}
                  </Typography>
                  <Box mt={{ xs: 3 }}>
                    <Button
                      href={slide.buttonUrl}
                      variant="contained"
                      color="secondary"
                    >
                      {slide.buttonText}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <img src={slide.imageUrl} alt="" style={{ width: "100%", maxHeight: '500px', objectFit: 'contain' }} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
      </Slider>
    </>
  );
}
