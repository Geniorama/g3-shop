import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Grid,
  Container,
  Stack,
  useTheme
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";

export default function Features() {
    const theme = useTheme()
  return (
    <Box component={"section"} sx={{ padding: "3rem 0" }}>
      <Container>
        <Stack direction={{xs: 'row'}} justifyContent={'center'} alignItems={'center'} spacing={4}>
          <Box
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
              borderRadius: '10px',
              width: '100%',
              maxWidth: '200px',
              border: `2px solid ${theme.palette.secondary.main}`
            }}
          >
            <RocketLaunchOutlinedIcon
              style={{ marginBottom: "5px" }}
              sx={{ fontSize: "56px" }}
              color="secondary"
            />
            <Typography
              color={"#ffffff"}
              component={"p"}
              variant="h6"
              sx={{ fontWeight: "500" }}
              fontSize={{ xs: "12px", md: "15px" }}
            >
              Fast Service
            </Typography>
          </Box>

          <Box
            textAlign={"center"}
            p={4}
            sx={{
              background: `${theme.palette.primary.dark}`,
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: '10px',
              width: '100%',
              maxWidth: '200px',
              border: `2px solid ${theme.palette.secondary.main}`
            }}
          >
            <ShieldOutlinedIcon
              style={{ marginBottom: "5px" }}
              sx={{ fontSize: "56px" }}
              color="secondary"
            />
            <Typography
              color={"#ffffff"}
              component={"p"}
              variant="h6"
              sx={{ fontWeight: "500" }}
              fontSize={{ xs: "12px", md: "15px" }}
            >
              Secure Payment
            </Typography>
          </Box>

          <Box
            textAlign={"center"}
            data-aos="fade-left"
            p={4}
            sx={{
              background: `${theme.palette.primary.dark}`,
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: '10px',
              width: '100%',
              maxWidth: '200px',
              border: `2px solid ${theme.palette.secondary.main}`
            }}
          >
            <InsertEmoticonOutlinedIcon
              style={{ marginBottom: "5px" }}
              sx={{ fontSize: "56px" }}
              color="secondary"
            />
            <Typography
              color={"#ffffff"}
              component={"p"}
              variant="h6"
              sx={{ fontWeight: "500" }}
              fontSize={{ xs: "12px", md: "15px" }}
            >
              Personalized attention
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
