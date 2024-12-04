import React from "react";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
import CardProduct from "@/components/Shop/CardProduct/CardProduct";
import Image from "next/image";
import HeadIcon from "@/assets/img/most_popular_icon.svg";

export type MostPopularProps = {
  title: string,
  description: string,
  imageUrl: string,
  iconUrl?: string,
  buttonLink?: string,
  buttonText?: string
}

export default function MostPopular({title, description, imageUrl, iconUrl, buttonLink, buttonText}:MostPopularProps) {
  return (
    <Box component={"section"} sx={{ padding: "3rem 1rem" }}>
      <Container>
        <Grid sx={{backgroundColor: "#FAFAFA" }} container>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              backgroundImage: `url('${imageUrl}')`,
              minHeight: {xs: "250px", lg: "20vh"},
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              flexGrow: '1',
              flexShrink: '0'
            }}
          >
            <Box sx={{ margin: "20px"}}></Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: "center", padding: "2rem" }}
          >
            <Box
              sx={{
                width: {xs: '130px'},
                height: {xs: '100px'},
                mx:{xs: 'auto'},
                position: 'relative',
                display: {xs: 'none', lg: 'block'}
              }}
              >
              <Image unoptimized layout="fill" objectFit="contain" alt="" src={HeadIcon} />
            </Box>
            <Typography
              component={"h4"}
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
            
            <Typography sx={{color: '#737373'}}>
              {description}
            </Typography>
            <Box sx={{margin: '2rem 0'}}></Box>
            <Button
              href={buttonLink}
              variant="outlined"
              color="secondary"
              >
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
