import React from "react";
import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import FilterBar from "@/components/Shop/FilterBar/FilterBar";
import GridProducts from "@/components/GridProducts/GridProducts";
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import storefront from "../../utils";

const metadata = {
  title: "Shop",
  description: "Hello world",
};

export default function Shop({ products }) {
  return (
    <Layout metadata={metadata}>
      <PageHeading title="Shop" />

      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{"Shop"}</Typography>
        </Breadcrumbs>
        <Box margin={3} />
        <FilterBar />
        <Box margin={3} />
        <Grid container spacing={5}>
          <Grid item xs={12} lg={3}>
            <SidebarShop />
          </Grid>
          <Grid item xs={12} lg={9}>
            {products && <GridProducts products={products.edges} />}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

const gql = String.raw;

const productsQuery = gql`
  query Products {
    products(first: 6) {
      edges {
        node {
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function getStaticProps() {
  try {
    const { data } = await storefront(productsQuery);
    if (!data || !data.products) {
      throw new Error("No se pudo obtener la lista de productos");
    }
    return {
      props: {
        products: data.products,
      },
    };
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    return {
      props: {
        products: [], // Devuelve una lista vacía en caso de error
      },
    };
  }
}
