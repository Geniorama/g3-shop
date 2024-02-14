import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Typography,
  Box,
  Container,
  Button,
  Breadcrumbs,
  Link,
  Grid,
} from "@mui/material";

import FormBilling from "../../components/Checkout/FormBilling/FormBilling";

const metadata = {
  title: "Checkout",
  description: "Lorem ipsum",
};

export default function index() {
  return (
    <Layout metadata={metadata}>
      <PageHeading title={metadata.title} />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{"Checkout"}</Typography>
        </Breadcrumbs>

        <Grid sx={{py:{xs: 7}}} container>
            <Grid item xs={12} md={8}>
                <FormBilling />
            </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
