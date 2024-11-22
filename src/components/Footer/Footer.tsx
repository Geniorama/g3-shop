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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { MenuCollection } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import socialMediaIcons from "@/utils/socialMediaIcons";

export default function Footer() {
  const [menuCollection, setMenuCollection] = useState<MenuCollection[]>([]);
  const theme = useTheme();
  const { contactInfo, socialMedia } = useSelector(
    (state: RootState) => state.general
  );

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
      <Stack
        sx={{
          position: "fixed",
          bottom: {xs: "10px", lg: "20px"},
          right: {xs: "10px", lg: "20px"},
          gap: 1,
          zIndex: 1
        }}
      >
        {socialMedia &&
          socialMedia.map((item, i) => {
            const findItem = socialMediaIcons.find(
              (subItem) => subItem.name === item.name
            );
            if (findItem) {
              return (
                <IconButton
                  href={item.url}
                  target="_blank"
                  size="large"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    aspectRatio: '1',
                    ":hover": { backgroundColor: theme.palette.primary.dark },
                  }}
                  key={i}
                >
                  {findItem.icon}
                </IconButton>
              );
            }
          })}
        {contactInfo?.whatsAppLink && (
          <IconButton
            href={contactInfo.whatsAppLink}
            target="_blank"
            size="large"
            sx={{
              background: `#25D366`,
              color: "white",
              aspectRatio: '1',
              "&:hover": {
                backgroundColor: "#128c7e",
              },
            }}
          >
            <WhatsAppIcon />
          </IconButton>
        )}

        <IconButton
          href="#top"
          size="large"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: "white",
            aspectRatio: '1',
            '&:hover':{
              backgroundColor: theme.palette.secondary.dark
            }
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Stack>

      <Container>
        <Grid
          container
          spacing={{ xs: 3, sm: 5, xl: 15 }}
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
              {contactInfo?.whatsAppNumber && (
                <Box component={"li"}>
                  <Link
                    href={contactInfo.whatsAppLink}
                    target="_blank"
                    sx={{ color: "white" }}
                  >
                    Phone: {contactInfo.whatsAppNumber}
                  </Link>
                </Box>
              )}

              {contactInfo?.address && (
                <Box component={"li"}>
                  <Link
                    href={contactInfo.locationLink}
                    target="_blank"
                    sx={{ color: "white" }}
                  >
                    Addrees: {contactInfo.address}
                  </Link>
                </Box>
              )}

              {contactInfo?.email && (
                <Box component={"li"}>
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    target="_blank"
                    sx={{ color: "white" }}
                  >
                    Email: {contactInfo.email}
                  </Link>
                </Box>
              )}
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
              {socialMedia?.map((item) => (
                <Box key={item.name} component={"li"}>
                  <Link
                    target="_blank"
                    href={item.url}
                    sx={{ color: "white", textTransform: "capitalize" }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box component={"hr"} sx={{ opacity: ".2", margin: "2rem 0" }}></Box>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid item>
            <Typography color={"white"} fontSize={"10px"}>
              Made with love ❤ by{" "}
              <Link
                href="https://g3marketingdigital.com/"
                target="_blank"
                sx={{ color: "white" }}
              >
                G3 Digital Marketing
              </Link>{" "}
              | {new Date().getFullYear()} © All rights reserved
            </Typography>
          </Grid>

          <Grid item xs={12} lg={"auto"}>
            <Stack direction={"row"} justifyContent={{ xs: "center" }}>
              {socialMedia?.map((item) => {
                const iconItem = socialMediaIcons.find(
                  (subItem) => subItem.name === item.name
                );
                return (
                  <IconButton
                    href={item.url}
                    target="_blank"
                    title={item.name}
                    aria-label={item.name}
                    key={item.name}
                    color="secondary"
                  >
                    {iconItem ? iconItem.icon : null}
                  </IconButton>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
