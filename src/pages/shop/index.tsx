import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button
} from "@mui/material";
import FilterBar from "@/components/Shop/FilterBar/FilterBar";
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product } from "@/types";
import type { Collection } from "shopify-buy";
import shopifyClient from "@/lib/shopify";

const metadata = {
  title: "Shop",
  description: "Hello world",
};

type ShopProps = {
  initialProducts: Product[];
  collections: Collection[];
  totalProducts: number;
};

const PRODUCTS_PER_PAGE = 9;

export default function Shop({ initialProducts, collections, totalProducts }: ShopProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filterByPrice = () => {
      const filtered = products.filter(product => {
        const price = product.normalPrice;
        return price >= priceRange[0] && price <= priceRange[1];
      });
      setFilteredProducts(filtered);
    };

    filterByPrice();
  }, [priceRange, products]);

  const fetchMoreProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      if (!Array.isArray(data.products)) {
        throw new Error('Invalid products data');
      }
      setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMoreProducts(nextPage);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

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
            <SidebarShop
              categories={collections}
              onPriceChange={handlePriceChange}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <GridProducts products={filteredProducts} pagination={false} />
            {products.length < totalProducts && (
              <Box textAlign="center" margin={3}>
                {/* <button onClick={handleLoadMore} disabled={isLoading}>
                  {isLoading ? "Loading..." : "Load More"}
                </button> */}
                <Button variant="outlined" onClick={handleLoadMore} disabled={isLoading}>
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

export async function getStaticProps() {
  try {
    const fetchProducts = await shopifyClient.product.fetchAll();
    const fetchCollections = await shopifyClient.collection.fetchAll();

    const initialProducts = fetchProducts.slice(0, PRODUCTS_PER_PAGE);
    const totalProducts = fetchProducts.length;

    const serializableProducts: Product[] = initialProducts.map((product) => ({
      id: product.id,
      title: product.title,
      image: {
        url: product.images[0].src,
        altText: product.images[0].altText,
      },
      description: product.descriptionHtml,
      normalPrice: product.variants[0].price.amount,
      isVariable: product.variants.length > 1,
      gallery: product.images
        ? product.images.map((image) => ({
            url: image.src,
            altText: image.altText,
          }))
        : [],
      slug: product.handle,
    }));

    const serializableCollections = fetchCollections.map((collection: Collection) => ({
      id: collection.id,
      title: collection.title,
      slug: collection.handle,
    }));

    return {
      props: {
        initialProducts: serializableProducts,
        collections: serializableCollections,
        totalProducts,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initialProducts: [],
        collections: [],
        totalProducts: 0,
      },
    };
  }
}
