import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export type CircleTechniqueProps = {
  title: string;
  color: string;
  image?: {
    src: string;
    altText: string;
  };
};

export default function CircleTechnique({
  title,
  color,
  image,
}: CircleTechniqueProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: color,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {image && image.src && (
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={image.src}
            alt=""
          />
        )}
      </Box>
      <Stack
        spacing={1}
        marginTop={"10px"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          component={"span"}
          sx={{
            display: { xs: "none", lg: "inline-block" },
            width: "10px",
            height: "10px",
            aspectRatio: "1",
            backgroundColor: color,
            borderRadius: "50%",
          }}
        ></Box>
        <Typography
          sx={{ fontSize: { xs: "13px", lg: "unset" } }}
          component={"p"}
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}
