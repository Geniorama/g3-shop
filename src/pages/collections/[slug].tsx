// pages/collections/[slug].tsx
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

const PRODUCTS_PER_PAGE = 9;

type CollectionPageProps = {
  collection: Collection;
  initialProducts: Product[];
  totalProducts: number;
};

export default function CollectionPage({ collection, initialProducts, totalProducts }: CollectionPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>('');

  // Fetch more products when the currentPage changes
  useEffect(() => {
    const fetchMoreProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products?collectionSlug=${collection.handle}&page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`);
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

    fetchMoreProducts();
  }, [currentPage, collection.handle]);

  // Filter products by price range
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

  // Sort filtered products
  useEffect(() => {
    const sortProducts = () => {
      let sortedProducts = [...filteredProducts];
      switch (sortOption) {
        case 'title-asc':
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'price-asc':
          sortedProducts.sort((a, b) => a.normalPrice - b.normalPrice);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.normalPrice - a.normalPrice);
          break;
      }
      setFilteredProducts(sortedProducts);
    };

    sortProducts();
  }, [sortOption, filteredProducts]);

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
    <Layout metadata={{ title: collection.title, description: collection.description }}>
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
            <GridProducts products={filteredProducts} pagination={false} />
            {products.length < totalProducts && (
              <Box textAlign="center" margin={3}>
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

export async function getStaticPaths() {
  try {
    const fetchCollections = await shopifyClient.collection.fetchAll();
    
    const paths = fetchCollections.map((collection: Collection) => ({
      params: { slug: collection.handle }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const collection = await shopifyClient.collection.fetchByHandle(params.slug);
    if (!collection) {
      throw new Error(`Collection with handle ${params.slug} not found`);
    }
    
    const fetchProducts = await shopifyClient.product.fetchAll();
    const fetchCollection = await shopifyClient.collection.fetchByHandle(params.slug)
    const productsByCollection = fetchCollection.products

    // Filter products by the collection handle
  
    const initialProducts = productsByCollection.slice(0, PRODUCTS_PER_PAGE);
    const totalProducts = productsByCollection.length;

    const serializableProducts: Product[] = initialProducts.map((product) => ({
      id: product.id,
      title: product.title,
      image: {
        url: product.images[0]?.src || '',
        altText: product.images[0]?.altText || '',
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
          handle: collection.handle, // Ensure handle is included
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
          id: '',
          title: '',
          description: '',
          handle: '', // Ensure handle is included
        },
        initialProducts: [],
        totalProducts: 0,
      },
    };
  }
}
