import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  useTheme,
  Button,
  Stack,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "@/assets/img/25415479_3.png";

export type Slide = {
  title: string;
  titleSmall: string;
  titleLarge: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: string;
  imageUrl: string;
  imageAlignment: string;
  iconUrl: string;
};

type SliderHomeProps = {
  slides: Slide[];
};

export default function SliderHome({ slides }: SliderHomeProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: slide.backgroundColor,
              height: { xs: "100%" },
              minHeight: {xs: '700px'},
              overflow: "hidden",
              py: {xs: 5}
            }}
          >
            <Container sx={{ height: "100%" }}>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                direction={{ xs: "column-reverse", lg: "row" }}
                gap={3}
                sx={{ height: "100%" }}
              >
                <Box sx={{width:{lg: '50%'}}}>
                  <Box sx={{ width: "200px", ml: { xs: "-50px" }, display: {xs: 'none', lg: 'block'} }}>
                    <img
                      data-aos="fade-left"
                      src={slide.iconUrl}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </Box>
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
                </Box>

                <Box sx={{width:{lg: '50%'}}}>
                  <Box sx={{ height: { xs: "300px", lg: "500px" } }}>
                    <img
                      src={slide.imageUrl}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Stack>
            </Container>
            {/* <Container>
              <Grid container sx={{py: {xs: 3 }}} spacing={{ xs: 5}} alignItems={"center"}>
                <Grid
                  xs={12}
                  lg={6}
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
                  <Box sx={{height: {xs: '300px', lg: '500px'}}}>
                    <img src={slide.imageUrl} alt="" style={{ width: "100%", height: '100%', objectFit: 'contain' }} />
                  </Box>
                </Grid>
              </Grid>
            </Container> */}
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
