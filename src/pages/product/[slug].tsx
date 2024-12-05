// product/[slug].tsx

import { GetServerSideProps } from "next";
import { Box, Container, Grid, Divider } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ProductHeading from "../../components/Product/ProductHeading/ProductHeading";
import ProductGallery from "../../components/Product/ProductGallery/ProductGallery";
import ProductSummary from "@/components/Product/ProductSummary/ProductSummary";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import NewsLetterBar from "../../components/Shop/NewsletterBar/NewsLetterBar";
import type { Product } from "@/types";
import shopifyClient from "@/lib/shopify";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/features/cartSlice";
import type { ItemCart } from "@/types";
import { AppDispatch } from "@/store";
import type { Entry } from "contentful";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import LoaderPage from "@/components/Loader/LoaderPage";
import useCommingSoon from "@/hooks/useCommingSoon";
import { fetchGeneralSettings } from "@/lib/dataFetchers";

type ProductProps = {
  product: Product;
  relatedProductsIds: Product["id"][];
  commingSoonMode: boolean;
  imageCover?: string;
};

export default function Product({ product, relatedProductsIds, commingSoonMode, imageCover }: ProductProps) {
  const [infoProduct, setInfoProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product["id"][]>();
  const dispatch = useDispatch<AppDispatch>();

  const metadata = {
    title: `${infoProduct?.title} | G3 Print` || "G3 Product",
    description: "Hello world",
  };

  const { isCommingSoon, isLoadingPage } = useCommingSoon(commingSoonMode);

  useEffect(() => {
    if (product) {
      setInfoProduct(product);
    }

    if (relatedProductsIds) {
      setRelatedProducts(relatedProductsIds);
    }
  }, [product, relatedProductsIds]);

  if (!infoProduct) {
    return "Loading...";
  }

  const handleAddToCart = async (item: ItemCart) => {
    dispatch(addItem(item));
  };

  if (isLoadingPage) {
    return <LoaderPage />;
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
      <ProductHeading cover={imageCover}  title={infoProduct.title} />

      <Box component={"section"} pt={{ xs: 2, lg: 10 }}>
        <Container>
          <Grid container pb={{ xs: 5 }} spacing={5}>
            <Grid item xs={12} md={6}>
              <ProductGallery images={infoProduct.gallery} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ProductSummary dataProduct={infoProduct} onAddToCart={handleAddToCart} />
            </Grid>

            {/* <Grid item xs={12}>
              <ProductTabs description={infoProduct.description} />
            </Grid> */}
          </Grid>

          {relatedProducts && relatedProducts.length > 0 && (
            <>
              <Divider sx={{ my: "80px" }} />

              <RelatedProducts />

              <Box sx={{ my: "80px" }} />
            </>
          )}
        </Container>
        <NewsLetterBar />
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  let infoProduct;

  if (!slug || Array.isArray(slug)) {
    return {
      notFound: true,
    };
  }

  try {
    const productData = await shopifyClient.product.fetchByHandle(slug);
    const productCollections = await shopifyClient.collection.fetchAllWithProducts();
    const collections = productCollections
      .filter((collection) => collection.products.some((p) => p.id === productData.id))
      .map((collection) => ({
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      }));

    const isVariable = (variants: any) => {
      return variants.length > 1;
    };

    const product: Product = {
      id: productData.id,
      slug: productData.handle,
      title: productData.title,
      description: productData.descriptionHtml,
      normalPrice: productData.variants[0].price.amount,
      image: {
        url: productData.images[0].src,
        altText: productData.images[0].altText,
      },
      gallery: productData.images.map((image) => ({
        url: image.src,
        altText: image.altText,
      })),
      options: productData.options.map((option: any) => ({
        id: option.id,
        name: option.name,
        values: option.values.map((value: any) => ({
          value: value.value,
        })),
      })),
      isVariable: isVariable(productData.variants),
      variants: productData.variants.map((variant) => ({
        variantId: variant.id,
        title: variant.title,
        price: variant.price.amount,
        selectedOptions: variant.selectedOptions.map((selectOption) => ({
          name: selectOption.name,
          value: selectOption.value,
        })),
      })),
      type: productData.productType,
      collections: collections,
    };

    infoProduct = product;
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }

  const generalSettings = await fetchGeneralSettings() as Entry;

  return {
    props: {
      product: infoProduct,
      relatedProductsIds: [],
      commingSoonMode: generalSettings.fields.maintenanceMode,
      imageCover: generalSettings.fields.coverProduct
    },
  };
};
