import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import GridProducts from "@/components/GridProducts/GridProducts";
import { fetchAllProducts } from "@/lib/dataFetchers";
import type { Product } from "@/types";
import { useEffect, useState } from "react";
import { Typography, Container, Box, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import Astronaut from "@/assets/img/lindo-astronauta-confundir-dibujos-animados-vector-icono-ilustracion-ciencia-tecnologia-icono-concepto-aislado.png";

const metadata = {
  title: "",
  description: "",
};

type SearchResultsProps = {
  allProducts: Product[];
};

export default function SearchResults({ allProducts }: SearchResultsProps) {
  const [resultProducts, setResultProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.q) {
      router.push("/");
    } else {
      const term = router.query.q as string;
      setSearchTerm(term);

      console.log(allProducts)
      // Filtrar productos basados en el término de búsqueda (coincidencia parcial)
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );

      console.log(filteredProducts)

      setResultProducts(filteredProducts);
      setLoading(false);
    }
  }, [router, allProducts]);

  if (loading) {
    return (
      <Layout metadata={metadata}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "calc(100vh - 100px)" }}
        >
          <Box sx={{ width: "70px" }}>
            <Loader />
            <Typography>Loading...</Typography>
          </Box>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout metadata={metadata}>
      <PageHeading title={`Results for: "${searchTerm}"`} />
      <Container>
        {resultProducts.length > 0 ? (
          <Box sx={{mb: 8}}>
            <GridProducts products={resultProducts} />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              color={"primary"}
              sx={{
                fontSize: { xs: "20px" },
                fontWeight: "bold",
              }}
            >
              Sorry, no results were found for your search
            </Typography>
            <Box sx={{ width: { xs: "300px", lg: "400px" }, mx: "auto" }}>
              <img style={{ width: "100%" }} src={Astronaut.src} alt="" />
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              gap={1}
              sx={{ mb: 8 }}
            >
              <Button href="/" variant="outlined">
                GO TO HOME
              </Button>
              <Button href="/shop" color="secondary" variant="contained">
                GO TO SHOP
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetchAllProducts(null, 250);
  const allProducts = res?.products.edges.map((product) => ({
    id: product.node.id,
    title: product.node.title,
    image: {
      url: product.node.images.edges[0].node.src,
      altText: product.node.images.edges[0].node.altText,
    },
    slug: product.node.handle,
  }));

  return {
    props: {
      allProducts,
    },
  };
}
