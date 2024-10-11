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
import type {
  Product,
  ShopifyCollectionResponse,
  ContactInfo,
  SocialMediaItem,
} from "@/types";
import Astronaut from "@/assets/img/g3-1Recurso 1.svg";
import {
  fetchContactInfo,
  fetchSocialMedia,
  fetchCollectionBySlug,
  fetchGeneralSettings
} from "@/lib/dataFetchers";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import {
  setSocialMedia,
  setContactInfo,
} from "@/store/features/generalInfoSlice";
import type { Entry } from "contentful";
import LoaderPage from "@/components/Loader/LoaderPage";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import useCommingSoon from "@/hooks/useCommingSoon";

const PRODUCTS_PER_PAGE = 9;

type CollectionPageProps = {
  collection: ShopifyCollectionResponse;
  initialProducts: Product[];
  totalProducts?: number;
  initialEndCursor: string;
  initialHasNextPage: boolean;
  contactInfo?: ContactInfo;
  socialMedia?: SocialMediaItem[];
  commingSoonMode: Entry 
};

export default function CollectionPage({
  collection,
  initialProducts,
  totalProducts,
  initialEndCursor,
  initialHasNextPage,
  contactInfo,
  socialMedia,
  commingSoonMode
}: CollectionPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [titlePage, setTitlePage] = useState("");
  const [cursor, setCursor] = useState<string | null>(initialEndCursor);
  const [hasNextPage, setHasNextPage] = useState<boolean>(initialHasNextPage);
  const [currentCollection, setCurrentCollection] = useState<{
    title: string;
    handle: string;
    image?: { src?: string; altText?: string };
  }>();

  const dispatch = useDispatch();

  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  const loadMoreProducts = async () => {
    if (!hasNextPage || isLoading || !currentCollection?.handle) return;

    setIsLoading(true);
    const newProductsResponse = await fetchCollectionBySlug(
      currentCollection?.handle,
      cursor
    );
    if (newProductsResponse !== null && newProductsResponse !== undefined) {
      const newProducts = newProductsResponse.collection?.products.edges.map(
        (product) => ({
          id: product.node.id,
          title: product.node.title,
          description: product.node.description,
          slug: product.node.handle,
          image: {
            url: product.node.images.edges[0]?.node.src,
            altText: product.node.images.edges[0]?.node.src,
          },
          normalPrice: +product.node.priceRange.minVariantPrice.amount,
          isVariable: product.node.variants.edges.length > 0,
        })
      );

      if (newProducts && newProducts.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setFilteredProducts((prevFiltered) => [
          ...prevFiltered,
          ...newProducts,
        ]);
      }
      setCursor(
        newProductsResponse.collection?.products.pageInfo.endCursor || null
      );
      setHasNextPage(
        newProductsResponse.collection?.products.pageInfo.hasNextPage || false
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (collection.collection) {
      const dataCurrentCollection = {
        title: collection.collection.title,
        handle: collection.collection.handle,
        image: {
          src: collection.collection.image?.src,
          altText: collection.collection.image?.altText,
        },
      };
      setCurrentCollection(dataCurrentCollection);
    }
  }, [collection]);

  useEffect(() => {
    if (contactInfo) {
      dispatch(setContactInfo(contactInfo));
    }
  }, [contactInfo, dispatch]);

  useEffect(() => {
    if (socialMedia) {
      dispatch(setSocialMedia(socialMedia));
    }
  }, [socialMedia, dispatch]);

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

  if(isLoadingPage){
    return <LoaderPage />
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout
      metadata={{
        title: `${currentCollection?.title} | G3 Print` || 'G3 Collection',
      }}
    >
      <PageHeading
        title={currentCollection?.title || ""}
        backgroundColor="#602BE0"
        textColor="#FFFFFF"
        floatImage={currentCollection?.image?.src || ''}
      />

      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/collections">
            Collections
          </Link>
          <Typography color="text.primary">
            {currentCollection?.title}
          </Typography>
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
                      {isLoading ? "Loading..." : "Load More"}
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

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  const fetchCollection = await fetchCollectionBySlug(params.slug);
  const contactInfo = await fetchContactInfo();
  const socialMedia = await fetchSocialMedia();

  const initialProducts =
    fetchCollection?.collection?.products.edges?.map((product) => ({
      id: product.node.id,
      title: product.node.title,
      description: product.node.description,
      slug: product.node.handle,
      image: {
        url: product.node.images.edges[0]?.node.src || "",
        altText: product.node.images.edges[0]?.node.altText || "",
      },
      normalPrice: product.node.priceRange.minVariantPrice.amount,
      isVariable: product.node.variants.edges.length > 0,
    })) || [];

  const initialEndCursor =
    fetchCollection?.collection?.products.pageInfo.endCursor || null;
  const initialHasNextPage =
    fetchCollection?.collection?.products.pageInfo.hasNextPage || false;
  const commingSoonMode = await fetchGeneralSettings()

  return {
    props: {
      collection: fetchCollection || {},
      initialProducts,
      totalProducts: initialProducts.length || 0,
      initialEndCursor,
      initialHasNextPage,
      contactInfo,
      socialMedia,
      commingSoonMode
    },
  };
}
