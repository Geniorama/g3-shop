// pages/collections/[slug].tsx
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import { Box, Container, Grid, Typography, Breadcrumbs, Link, Button } from "@mui/material";
import FilterBar from "@/components/Shop/FilterBar/FilterBar";
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product } from "@/types";
import type { Collection } from "shopify-buy";
import shopifyClient from "@/lib/shopify";
import Loader from "@/components/Loader/Loader";

const PRODUCTS_PER_PAGE = 9;

type CollectionPageProps = {
  collection: Collection;
  initialProducts: Product[];
  totalProducts: number;
};

export default function CollectionPage({
  collection,
  initialProducts,
  totalProducts,
}: CollectionPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  // Filter products based on price range
  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const price = product.normalPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredProducts(filtered);
  };

  // Sort products based on selected option
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

  // Fetch more products when the currentPage changes
  useEffect(() => {
    const fetchMoreProducts = async () => {
      if (isLoading) return; // Avoid multiple calls if already loading

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/products?collectionSlug=${collection.handle}&page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        if (!Array.isArray(data.products)) {
          throw new Error("Invalid products data");
        }

        // Avoid duplicate products
        const newProducts = data.products.filter((product: Product) =>
          !products.some((existingProduct) => existingProduct.id === product.id)
        );

        setProducts((prev) => [...prev, ...newProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoreProducts();
  }, [currentPage, collection.handle]);

  // Update filtered and sorted products when filters or sorting change
  useEffect(() => {
    filterProducts();
  }, [priceRange, products]);

  useEffect(() => {
    sortProducts();
  }, [filteredProducts, sortOption]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
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
        title: collection.title,
        description: collection.description,
      }}
    >
      <PageHeading title={collection.title} />

      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/collections">
            Collections
          </Link>
          <Typography color="text.primary">{collection.title}</Typography>
        </Breadcrumbs>
        <Box margin={3} />
        <FilterBar
          totalProducts={totalProducts}
          filteredProductsCount={filteredProducts.length}
          productsPerPage={PRODUCTS_PER_PAGE}
          currentPage={currentPage}
          onSortChange={handleSortChange}
        />
        <Box margin={3} />
        <Grid container spacing={5}>
          <Grid item xs={12} lg={3}>
            <SidebarShop
              categories={[]} // No categories for specific collection view
              onPriceChange={handlePriceChange}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            {sortedProducts.length > 0 ? (
              <GridProducts products={sortedProducts} pagination={false} />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  p: 2,
                }}
              >
                <Loader
                  sx={{
                    width: "50px",
                    height: "50px",
                    margin: "auto",
                  }}
                />
              </Box>
            )}
            {products.length < totalProducts && (
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

export async function getStaticPaths() {
  try {
    const fetchCollections = await shopifyClient.collection.fetchAll();

    const paths = fetchCollections.map((collection: Collection) => ({
      params: { slug: collection.handle },
    }));

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const collection = await shopifyClient.collection.fetchByHandle(params.slug);
    if (!collection) {
      throw new Error(`Collection with handle ${params.slug} not found`);
    }

    const productsByCollection = collection.products;
    const totalProducts = productsByCollection.length;

    const initialProducts = productsByCollection.slice(0, PRODUCTS_PER_PAGE);

    const serializableProducts: Product[] = initialProducts.map((product) => ({
      id: product.id,
      title: product.title,
      image: {
        url: product.images[0]?.src || "",
        altText: product.images[0]?.altText || "",
      },
      description: product.descriptionHtml,
      normalPrice: product.variants[0]?.price.amount,
      isVariable: product.variants.length > 1,
      gallery: product.images
        ? product.images.map((image) => ({
            url: image.src,
            altText: image.altText,
          }))
        : [],
      slug: product.handle,
    }));

    return {
      props: {
        collection: {
          id: collection.id,
          title: collection.title,
          description: collection.descriptionHtml,
          handle: collection.handle,
        },
        initialProducts: serializableProducts,
        totalProducts,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        collection: {
          id: "",
          title: "",
          description: "",
          handle: "", 
        },
        initialProducts: [],
        totalProducts: 0,
      },
    };
  }
}
