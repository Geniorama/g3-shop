import React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  useTheme,
} from "@mui/material";

export type Feature = {
  icon: string;
  title: String;
};

type FeaturesProps = {
  features: Feature[];
};

export default function Features({ features }: FeaturesProps) {
  const theme = useTheme();
  return (
    <Box component={"section"} sx={{ padding: "3rem 0" }}>
      <Container>
        <Stack
          direction={{ lg: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          gap={{ xs: 2, lg: 4 }}
        >
          {features.map((feature, i) => (
            <Box
              key={i}
              data-aos="fade-right"
              textAlign={"center"}
              p={4}
              sx={{
                background: `${theme.palette.primary.dark}`,
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "10px",
                gap: 2,
                width: "100%",
                maxWidth: "200px",
                border: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Box sx={{width: {xs: '50px'}}}>
                <img style={{width: '100%', height: 'auto'}} src={feature.icon} alt="" />
              </Box>
              <Typography
                color={"#ffffff"}
                component={"p"}
                variant="h6"
                sx={{ fontWeight: "500" }}
                fontSize={{ xs: "12px", md: "15px" }}
              >
                {feature.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
