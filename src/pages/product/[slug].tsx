import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container, Grid, Divider, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import ProductHeading from "../../components/Product/ProductHeading/ProductHeading";
import ProductGallery from "../../components/Product/ProductGallery/ProductGallery";
import ProductSummary from "@/components/Product/ProductSummary/ProductSummary";
import ProductTabs from "../../components/Product/ProductTabs/ProductTabs";
import RelatedProducts from "../../components/Product/RelatedProducts/RelatedProducts";
import NewsLetterBar from "../../components/Shop/NewsletterBar/NewsLetterBar";
import type { Product } from "@/types";
import shopifyClient from "@/lib/shopify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCheckoutId } from "@/store/features/cartSlice";
import type { ItemCart } from "@/types";
import { AppDispatch } from "@/store";

type ProductProps = {
  product: Product;
  relatedProductsIds: Product["id"][];
};

export default function Product({ product, relatedProductsIds }: ProductProps) {
  const [infoProduct, setInfoProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product["id"][]>();
  const dispatch = useDispatch<AppDispatch>();

  const metadata = {
    title: `${infoProduct?.title} | G3 Print Shop` || "G3 Product",
    description: "Hello world",
  };

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

  console.log(infoProduct);

  return (
    <Layout metadata={metadata}>
      <ProductHeading title={infoProduct.title} />

      <Box component={"section"} pt={{ xs: 10 }}>
        <Container>
          <Grid container pb={{ xs: 5 }} spacing={5}>
            <Grid item xs={12} md={6}>
              <ProductGallery images={infoProduct.gallery} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ProductSummary
                dataProduct={infoProduct}
                onAddToCart={handleAddToCart}
              />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await shopifyClient.product.fetchAll();

  const paths = products.map((product: any) => ({
    params: { slug: product.handle },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug || Array.isArray(slug)) {
    return {
      notFound: true,
    };
  }

  try {
    const productData = await shopifyClient.product.fetchByHandle(slug);
    const productCollections =
      await shopifyClient.collection.fetchAllWithProducts();
    const collections = productCollections
      .filter((collection) =>
        collection.products.some((p) => p.id === productData.id)
      )
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

    return {
      props: {
        product,
        relatedProductsIds: [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
