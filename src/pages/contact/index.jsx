import PageHeading from "@/components/PageHeading/PageHeading";
import Layout from "@/components/Layout/Layout";
import { Container, Box, Typography, Grid, Stack, Link, IconButton, Icon } from "@mui/material";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FormContact from "@/components/Contact/FormContact/FormContact";

const metadata = {
  title: "Contact Us",
  description: "Hello world",
};

export default function Contact() {
  return (
    <Layout metadata={metadata}>
      <PageHeading title={metadata.title} />

      <Container>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.6164088781857!2d-76.93986092326558!3d41.25191287131741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89cf9bfb307f59b3%3A0x166e5897246f5b5a!2sG3%20Graphics%20%26%20Printing!5e0!3m2!1ses!2sco!4v1713533101784!5m2!1ses!2sco"
            style={{ border: "0", width: "100%", aspectRatio: "16 / 6" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

        <Grid py={6} container spacing={4}>
          <Grid item md={6}>
            <Typography
              component={"h5"}
              variant="h3"
              sx={{ fontWeight: "bold" }}
            >
              Do you have some questions?
            </Typography>
            <Typography py={2}>
              We are at your disposal 7 days a week!
            </Typography>
           
            <Typography>
              29 SE 2nd Ave, <br /> Miami, Florida 33131, <br /> United States
            </Typography>

            <Link display={'block'} py={2}>
              info@g3print.com
            </Link>

            <Link fontWeight={'bold'}>
              +08 9229 8228
            </Link>

            <Stack direction={'row'} mt={2} spacing={1}>
              <IconButton href="#" target="_blank">
                <FacebookOutlinedIcon />
              </IconButton>

              <IconButton href="#" target="_blank">
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item md={6}>
            <FormContact />
          </Grid>
        </Grid>

      </Container>
    </Layout>
  );
}
