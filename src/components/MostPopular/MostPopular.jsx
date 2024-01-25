import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import CardProduct from "@/components/Shop/CardProduct/CardProduct";
import Image from "next/image";
import HeadIcon from "../../../public/img/most_popular_icon.svg";

export default function MostPopular() {
  return (
    <Box component={"section"} sx={{ padding: "3rem 1rem" }}>
      <Container>
        <Grid sx={{backgroundColor: "#FAFAFA" }} container>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1599590984817-0c15f31b1fa5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            //   height: "70vh",
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
            <Image width={130} height={100} alt="" src={HeadIcon} />
            <Typography
              component={"h4"}
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              MOST POPULAR
            </Typography>
            
            <Typography sx={{color: '#737373'}}>
              We focus on ergonomics and meeting you where you work. It&apos;s only a
              keystroke away.
            </Typography>
            <Box sx={{margin: '2rem 0'}}></Box>
            <CardProduct />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
