// pages/shop.tsx
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import { Box, Container, Grid, Typography, Button, Stack } from "@mui/material";
import FilterBar from "@/components/Shop/FilterBar/FilterBar";
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product, MenuCollection } from "@/types";
import shopifyClient from "@/lib/shopify";
import Loader from "@/components/Loader/Loader";

const PRODUCTS_PER_PAGE = 9;

type ShopPageProps = {
  collections?: MenuCollection[];
};

export default function ShopPage({ collections }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sidebarCollections, setSidebarCollections] = useState<
    MenuCollection[]
  >([]);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const price = product.normalPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredProducts(filtered);
  };

  const sortProducts = () => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.normalPrice - b.normalPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.normalPrice - a.normalPrice);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  };

  useEffect(() => {
    if (collections) {
      setSidebarCollections(collections);
    }
  }, [collections]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        if (!Array.isArray(data.products)) {
          throw new Error("Invalid products data");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialProducts();
  }, [currentPage]);

  useEffect(() => {
    filterProducts(); // Filtrar por precio
    sortProducts(); // Ordenar según la opción seleccionada
  }, [priceRange, sortOption, products]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <Layout
      metadata={{
        title: "Shop",
        description: "Browse all our products",
      }}
    >
      <PageHeading title="Shop" />

      <Container>
        <Box margin={3} />
        <FilterBar
          totalProducts={products.length}
          filteredProductsCount={filteredProducts.length}
          productsPerPage={PRODUCTS_PER_PAGE}
          currentPage={currentPage}
          onSortChange={handleSortChange}
        />
        <Box margin={3} />
        <Grid container spacing={5}>
          <Grid item xs={12} lg={3}>
            <SidebarShop
              categories={sidebarCollections ? sidebarCollections : []} // No categories for general shop view
              onPriceChange={handlePriceChange}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            {sortedProducts && sortedProducts.length > 0 ? (
              <GridProducts products={sortedProducts} pagination={false} />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Stack gap={1}>
                  <Loader
                    sx={{
                      width: "50px",
                      height: "50px",
                      margin: "auto",
                    }}
                  />
                  <Typography fontWeight={'600'}>Loading ...</Typography>
                </Stack>
              </Box>
            )}
            {products.length > PRODUCTS_PER_PAGE && (
              <Box textAlign="center" margin={3}>
                <Button
                  variant="outlined"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const fetchDataCollections = await shopifyClient.collection.fetchAll();

    const serializeCollections = fetchDataCollections.map((collection) => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
    }));

    return {
      props: {
        collections: serializeCollections,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        collections: [],
      },
    };
  }
}
