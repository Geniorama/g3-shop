import { Box, Container, Grid, Divider, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ProductHeading from "../../components/Product/ProductHeading/ProductHeading";
import ProductGallery from "../../components/Product/ProductGallery/ProductGallery";
import ProductSummary from "../../components/Product/ProductSummary/ProductSummary";
import ProductTabs from "../../components/Product/ProductTabs/ProductTabs";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import NewsLetterBar from "../../components/Shop/NewsletterBar/NewsLetterBar";

const metadata = {
  title: "Producto",
  description: "Hello world",
};

const dataProduct = {
  name: "My product name",
  description: "Vestibulum nec erat sit amet ante sollicitudin sollicitudin a eget purus. Mauris vitae finibus nibh. Vivamus nec pretium eros. Phasellus euismod tempus ultrices. Sed imperdiet et lacus quis ullamcorper. Integer pellentesque porttitor mauris sit amet ultrices. Quisque ante neque, vulputate vitae tempor ac, pellentesque quis justo. Donec tempor justo ultrices vulputate malesuada. Donec sodales tempor sapien in mattis. Quisque vel iaculis sem, eget varius erat. Fusce vitae ornare tortor. Maecenas sit amet turpis turpis. Duis rutrum, tellus non dignissim viverra, orci ligula ultrices ex, sed pellentesque nisl urna et ex. Sed a vehicula orci. Vivamus lacus velit, dignissim ac tortor sit amet, lobortis iaculis orci. Maecenas eros mauris, consectetur quis enim eu, tempus venenatis est.",
  shortDescription: "Lorem ipsum",
  price: 140,
};

export default function Product() {
  const { name } = dataProduct;
  return (
    <Layout metadata={metadata}>
      <ProductHeading title={name} />

      <Box component={"section"} pt={{ xs: 10 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <ProductGallery />
            </Grid>

            <Grid item xs={12} md={6}>
              <ProductSummary dataProduct={dataProduct} />
            </Grid>

            <Grid item xs={12}>
              <ProductTabs />
            </Grid>
          </Grid>

          <Divider sx={{my: '80px'}} />

          <RelatedProducts />

          <Box sx={{my: '80px'}} />
        </Container>
        <NewsLetterBar />
      </Box>
    </Layout>
  );
}
