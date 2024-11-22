import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  useTheme,
  Button,
  Stack,
  IconButton,
  SxProps,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export type Slide = {
  title?: string;
  titleSmall?: string;
  titleSmallColor?: string;
  titleLarge?: string;
  titleLargeColor?: string;
  description?: string;
  descriptionColor?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  imageUrl?: string;
  imageAlignment?: string;
  iconUrl?: string;
};

type SliderHomeProps = {
  slides: Slide[];
};



export default function SliderHome({ slides }: SliderHomeProps) {
  const theme = useTheme()

  const arrowsStyles:SxProps = {
    zIndex: 1,
    position: "absolute",
    color: '#FFFFFF',
    backgroundColor: theme.palette.primary.main,
    width: '50px',
    height: '50px',
    border: '2px solid #CCCCCC',
    bottom: {xs: '0px', lg: 'none'},
    top: {xs: 'unset', lg: '50%'},
    "&::before":{
      display: 'none'
    },
    "&:hover, &:active":{
      backgroundColor: theme.palette.secondary.dark,
      color: "#FFFFFF"
    },
    "&:focus":{
      backgroundColor: theme.palette.primary.dark,
      color: "#FFFFFF"
    }
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <IconButton
        title="prev" 
        sx={{
          ...arrowsStyles,
          left: {xs: 'calc(50% - 70px)', lg: '25px'}
        }}>
        <ChevronLeftIcon sx={{fontSize: '30px'}} />
      </IconButton>
    ),
    nextArrow: (
      <IconButton
        title="next" 
        sx={{
          ...arrowsStyles,
          right: {xs: 'calc(50% - 70px)', lg: '25px'}
        }}>
        <ChevronRightIcon sx={{fontSize: '30px'}} />
      </IconButton>
    ),
  };

  return (
    <Box sx={{ overflow: "visible" }}>
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: slide.backgroundColor,
              height: { xs: "100%" },
              minHeight: { xs: "700px" },
              overflow: "hidden",
              py: { xs: 5 },
              position: "relative",
            }}
          >
            {slide.backgroundImage && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                  display: {
                    xs: slide.backgroundImage ? "none" : "block",
                    md: "block",
                  },
                }}
              >
                <Image
                  unoptimized
                  src={slide.backgroundImage}
                  layout="fill"
                  objectFit="cover"
                  alt={slide.titleLarge || ""}
                />
              </Box>
            )}

            {slide.backgroundImageMobile && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                  display: {
                    xs: !slide.backgroundImageMobile ? "none" : "block",
                    md: "none",
                  },
                }}
              >
                <Image
                  unoptimized
                  src={slide.backgroundImageMobile}
                  layout="fill"
                  objectFit="cover"
                  alt={slide.titleLarge || ""}
                />
              </Box>
            )}
            <Container sx={{ height: "100%", position: "relative" }}>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                direction={{ xs: "column-reverse", lg: "row" }}
                gap={3}
                sx={{ height: "100%" }}
              >
                <Box sx={{ width: { lg: "50%" } }}>
                  <Box
                    sx={{
                      width: "200px",
                      ml: { xs: "-50px" },
                      display: { xs: "none", lg: "block" },
                    }}
                  >
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
                    color={slide.titleSmallColor || "secondary"}
                  >
                    {" "}
                    {slide.titleSmall}
                  </Typography>
                  <Typography
                    fontSize={{ xs: "50px", md: "80px" }}
                    fontWeight={"bold"}
                    lineHeight={"1em"}
                    color={slide.titleLargeColor || "white"}
                  >
                    {" "}
                    {slide.titleLarge}
                  </Typography>
                  <Typography
                    fontSize={"15px"}
                    color={slide.descriptionColor || "#f4f4f4"}
                    mt={3}
                  >
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

                <Box sx={{ width: { lg: "50%" } }}>
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
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
