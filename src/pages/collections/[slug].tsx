import React, { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import { Box, Container, Grid, Typography, Breadcrumbs, Link, Button, Stack } from "@mui/material";
import FilterBar from "@/components/Shop/FilterBar/FilterBar";
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product } from "@/types";
import type { Collection } from "shopify-buy";
import shopifyClient from "@/lib/shopify";
import Loader from "@/components/Loader/Loader";
import { useInView } from "react-intersection-observer";

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

  // Intersection Observer hook to trigger loading more products
  const { ref, inView } = useInView({
    threshold: 1.0, // Trigger when 100% of the element is visible
    triggerOnce: false, // Keep triggering until no more products
  });

  // Fetch more products when the currentPage changes
  useEffect(() => {
    const fetchMoreProducts = async () => {
      if (isLoading || products.length >= totalProducts) return; // Avoid multiple calls if already loading or all products are loaded

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
        setCurrentPage((prev) => prev + 1); // Increment page number for next fetch
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      fetchMoreProducts();
    }
  }, [inView, currentPage, collection.handle, isLoading, products, totalProducts]);

  // Filter products based on price range
  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const price = product.normalPrice;
        return price >= priceRange[0] && price <= priceRange[1];
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [priceRange, products]);

  // Sort products based on selected option
  useEffect(() => {
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

    sortProducts();
  }, [filteredProducts, sortOption]);

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
              <>
                <GridProducts products={sortedProducts} pagination={false} />
                <div ref={ref}>
                  {isLoading && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                      }}
                    >
                      <Loader sx={{ width: "50px", height: "50px", margin: "auto" }} />
                      <Typography fontWeight={'600'}>Loading...</Typography>
                    </Box>
                  )}
                </div>
              </>
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
                <Typography fontWeight={'600'}>No products available</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  try {
    const collection = await shopifyClient.collection.fetchByHandle(params.slug);
    if (!collection) {
      return {
        notFound: true,
      };
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
      notFound: true,
    };
  }
}
