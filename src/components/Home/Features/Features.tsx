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
  backgroundColor?: string;
  textColor?: string;
  link?: string;
};

type FeaturesProps = {
  features: Feature[];
};

export default function Features({ features }: FeaturesProps) {
  const theme = useTheme();

  const handleClick = (link?: string) => {
    if(!link){
      return
    }
    window.open(link, '_blank')
  }

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
              onClick={() => handleClick(feature.link)}
              p={4}
              sx={{
                background: feature.backgroundColor || theme.palette.primary.dark,
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "10px",
                gap: 2,
                width: "100%",
                maxWidth: {lg: "200px"},
                cursor: feature.link ? 'pointer' : 'unset'
                // border: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Box sx={{width: {xs: '80%', lg: '50px'}}}>
                <img style={{width: '100%', height: 'auto'}} src={feature.icon} alt="" />
              </Box>
              <Typography
                color={feature.textColor || "#ffffff"}
                component={"p"}
                variant="h6"
                sx={{ fontWeight: "700" }}
                fontSize={{ xs: "20px", md: "15px" }}
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
