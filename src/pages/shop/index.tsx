import React, { useState, useEffect, use } from "react";
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
import SidebarShop from "@/components/Shop/SidebarShop/SidebarShop";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product, ShopifyCollectionResponse, ContactInfo, SocialMediaItem, ShopifyProductsResponse } from "@/types";
import Astronaut from "@/assets/img/g3-1Recurso 1.svg";
import {
  fetchContactInfo,
  fetchSocialMedia,
  fetchCollectionBySlug,
  fetchAllProducts
} from "@/lib/dataFetchers";
import { useDispatch } from "react-redux";
import {Button} from "@mui/material";
import { setSocialMedia, setContactInfo } from "@/store/features/generalInfoSlice";

const PRODUCTS_PER_PAGE = 9;

type ShopPageProps = {
  allProducts: ShopifyProductsResponse;
  initialProducts: Product[];
  totalProducts?: number;
  initialEndCursor: string;
  initialHasNextPage: boolean;
  contactInfo?: ContactInfo,
  socialMedia?: SocialMediaItem[]
};

export default function ShopPage({
  allProducts,
  initialProducts,
  totalProducts,
  initialEndCursor,
  initialHasNextPage,
  contactInfo,
  socialMedia
}: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [titlePage, setTitlePage] = useState('')
  const [cursor, setCursor] = useState<string | undefined>(initialEndCursor);
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialHasNextPage);

  const dispatch = useDispatch()

  const loadMoreProducts = async () => {
    if (!hasNextPage || isLoading) return;

    setIsLoading(true);

    try {
      const newProductsResponse = await fetchAllProducts(cursor);

      if(newProductsResponse){
        const newProducts = newProductsResponse.products.edges.map((product: any) => ({
          id: product.node.id,
          title: product.node.title,
          slug: product.node.handle,
          description: product.node.description || '',
          image: {
            url: product.node.images.edges[0]?.node.src || '',
            altText: product.node.images.edges[0]?.node.altText || '',
          },
          normalPrice: parseFloat(product.node.priceRange.minVariantPrice.amount),
          isVariable: product.node.variants.edges.length > 0,
        }));
  
        setProducts((prevProducts) => [
          ...prevProducts,
          ...newProducts,
        ]);
  
        setCursor(newProductsResponse.products.pageInfo.endCursor);
        setHasNextPage(newProductsResponse.products.pageInfo.hasNextPage);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching more products:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(contactInfo){
      dispatch(setContactInfo(contactInfo))
    }
  }, [contactInfo, dispatch])

  useEffect(() => {
    if(socialMedia){
      dispatch(setSocialMedia(socialMedia))
    }
  }, [socialMedia, dispatch])

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
          sorted.sort((a, b) => a.normalPrice - b.normalPrice); // Asegúrate de que normalPrice es un número
          break;
        case "price-desc":
          sorted.sort((a, b) => b.normalPrice - a.normalPrice); // Asegúrate de que normalPrice es un número
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
        title: titlePage,
        // description: collection.description,
      }}
    >
      <PageHeading
        title={'Shop'}
        backgroundColor="#602BE0"
        textColor="#FFFFFF"
        floatImage={Astronaut.src}
      />

      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Shop</Typography>
        </Breadcrumbs>
        <Box margin={3} />
        <FilterBar
          totalProducts={totalProducts || 0}
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
                {hasNextPage && (
                  <Box display="flex" justifyContent="center" marginY={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={loadMoreProducts}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                  </Box>
                )}
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
                <Typography fontWeight={"600"}>
                  No products available
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const allProducts = await fetchAllProducts();
  const contactInfo = await fetchContactInfo()
  const socialMedia = await fetchSocialMedia()

  const initialProducts = allProducts?.products.edges?.map((product) => ({
    id: product.node.id,
    title: product.node.title,
    description: product.node.description,
    slug: product.node.handle,
    image: {
      url: product.node.images.edges[0]?.node.src || '',
      altText: product.node.images.edges[0]?.node.altText || '',
    },
    normalPrice: product.node.priceRange.minVariantPrice.amount,
    isVariable: product.node.variants.edges.length > 0,
  })) || [];

  const initialEndCursor = allProducts?.products.pageInfo.endCursor || null;
  const initialHasNextPage = allProducts?.products.pageInfo.hasNextPage || false;

  return {
    props: {
      allProducts,
      initialProducts,
      totalProducts: initialProducts.length || 0,
      initialEndCursor,
      initialHasNextPage,
      contactInfo,
      socialMedia
    },
  };
}
