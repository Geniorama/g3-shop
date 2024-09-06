import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";

type PageHeadingProps = {
  title: string;
  textAlign?: "right" | "left" | "center";
  backgroundColor?: string;
  textColor?: string;
  floatImage?: string;
};

export default function PageHeading({
  title,
  textAlign,
  backgroundColor,
  textColor,
  floatImage,
}: PageHeadingProps) {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || "#F8F8F8",
        minHeight: { lg: "25vh" },
        display: { xs: "flex" },
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      component={"section"}
      mb={{ xs: 5 }}
      py={{ xs: 6, md: 8 }}
    >
      <Container>
        {floatImage && (
          <Box
            sx={{
              width: { xs: "15%" },
              position: "absolute",
              right: "10%",
              top: "10%",
              display: { xs: "none", lg: "block" },
            }}
          >
            <img style={{ width: "100%" }} src={floatImage} alt="" />
          </Box>
        )}
        <Grid container>
          <Grid textAlign={textAlign || "center"} item xs={12}>
            <Typography
              component={"h1"}
              variant="h2"
              fontWeight={"bold"}
              color={textColor || "#252525"}
              fontSize={{ xs: "30px", lg: "50px" }}
              textTransform={"uppercase"}
              letterSpacing={{ xs: 3 }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
