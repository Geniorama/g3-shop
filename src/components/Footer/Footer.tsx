import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { MenuCollection } from "@/types";

export default function Footer() {
  const [menuCollection, setMenuCollection] = useState<MenuCollection[]>([]);
  const theme = useTheme();

  async function fetchMenuItems() {
    try {
      const res = await fetch("/api/menuCollections");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const menuData = await res.json();
      setMenuCollection(menuData.collections);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <Box
      component={"footer"}
      sx={{ padding: "2rem", backgroundColor: "#252B42" }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <IconButton
          href="#top"
          sx={{
            background: `${theme.palette.secondary.light}`,
            color: "white",
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Box>

      <Container>
        <Grid
          container
          spacing={{ xs: 3, sm: 5, lg: 18 }}
          justifyContent={"flex-start"}
        >
          {/* Widget */}
          <Grid sx={{ color: "white" }} item xs={6} sm={"auto"}>
            <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>
              Navigation
            </Typography>
            <Box
              component={"ul"}
              sx={{ fontSize: "10px", listStyle: "none", lineHeight: "2em" }}
            >
              <Box component={"li"}>
                <Link href="/" sx={{ color: "white" }}>
                  Home
                </Link>
              </Box>

              <Box component={"li"}>
                <Link href="/shop" sx={{ color: "white" }}>
                  Shop
                </Link>
              </Box>

              <Box component={"li"}>
                <Link href="/contact" sx={{ color: "white" }}>
                  Contact
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Widget */}
          <Grid sx={{ color: "white" }} item xs={6} sm={"auto"}>
            <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>
              Legal
            </Typography>
            <Box
              component={"ul"}
              sx={{ fontSize: "10px", listStyle: "none", lineHeight: "2em" }}
            >
              <Box component={"li"}>
                <Link href="/privacy-policy" sx={{ color: "white" }}>
                  Privacy policy
                </Link>
              </Box>

              <Box component={"li"}>
                <Link href="/terms-and-conditions" sx={{ color: "white" }}>
                  Terms & conditions
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Widget */}
          <Grid sx={{ color: "white" }} item xs={6} sm={"auto"}>
            <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>
              Categories
            </Typography>
            <Box
              component={"ul"}
              sx={{ fontSize: "10px", listStyle: "none", lineHeight: "2em" }}
            >
              {menuCollection.map((item) => (
                <Box key={item.id} component={"li"}>
                  <Link
                    href={`/collections/${item.handle}`}
                    sx={{ color: "white" }}
                  >
                    {item.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Widget */}
          <Grid sx={{ color: "white" }} item xs={6} sm={"auto"}>
            <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>
              Company info
            </Typography>
            <Box
              component={"ul"}
              sx={{ fontSize: "10px", listStyle: "none", lineHeight: "2em" }}
            >
              <Box component={"li"}>
                <Link sx={{ color: "white" }}>Phone: +08 9229 8228</Link>
              </Box>

              <Box component={"li"}>
                <Link
                  href="https://maps.app.goo.gl/4turQdzFf9MTWyyTA"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  29 SE 2nd Ave, Miami, Florida 33131, United States
                </Link>
              </Box>

              <Box component={"li"}>
                <Link
                  href="mailto:info@g3print.com"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  Email: info@g3print.com
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Widget */}
          <Grid sx={{ color: "white" }} item xs={6} sm={"auto"}>
            <Typography sx={{ fontSize: "12px", marginBottom: "10px" }}>
              Follow Us
            </Typography>
            <Box
              component={"ul"}
              sx={{ fontSize: "10px", listStyle: "none", lineHeight: "2em" }}
            >
              <Box component={"li"}>
                <Link sx={{ color: "white" }}>Facebook</Link>
              </Box>

              <Box component={"li"}>
                <Link sx={{ color: "white" }}>Instagram</Link>
              </Box>

              <Box component={"li"}>
                <Link sx={{ color: "white" }}>Pinterest</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box component={"hr"} sx={{ opacity: ".2", margin: "2rem 0" }}></Box>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid item>
            <Typography color={"white"} fontSize={"10px"}>
              Made with love ❤ by{" "}
              <Link href="https://g3marketingdigital.com/" target="_blank" sx={{ color: "white" }}>G3 Digital Marketing</Link> |{" "}
              {new Date().getFullYear()} © All rights reserved
            </Typography>
          </Grid>

          <Grid item xs={12} lg={"auto"}>
            <Stack direction={"row"} justifyContent={{ xs: "center" }}>
              <IconButton color="secondary">
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton color="secondary">
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
