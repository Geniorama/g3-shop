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
import { useDispatch, useSelector} from "react-redux";
import { addItem, removeItem } from "@/store/features/cartSlice";
import { createCheckout, addLineItems, removeLineItem } from "@/store/actions/cartActions";
import { RootState } from "@/store";
import type { ItemCart } from "@/types";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";

const metadata = {
  title: "Producto",
  description: "Hello world",
};

type ProductProps = {
  product: Product;
  relatedProductsIds: Product["id"][];
};

export default function Product({ product, relatedProductsIds }: ProductProps) {
  const { title } = product;
  const [infoProduct, setInfoProduct] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product["id"][]>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  useEffect(() => {
    if (product) {
      setInfoProduct(product);
    }

    if (relatedProductsIds) {
      setRelatedProducts(relatedProductsIds);
    }
  }, [product, relatedProductsIds]);

  if (!infoProduct) {
    return "Cargando...";
  }

  const handleAddToCart = async (item: ItemCart) => {
    dispatch(addItem(item))
    setTimeout(() => router.push('/cart'), 1000)
  };

  return (
    <Layout metadata={metadata}>
      <ProductHeading title={infoProduct.title} />

      <Box component={"section"} pt={{ xs: 10 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <ProductGallery images={infoProduct.gallery} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ProductSummary 
                dataProduct={infoProduct} 
                onAddToCart={handleAddToCart}
              />
            </Grid>

            <Grid item xs={12}>
              <ProductTabs description={infoProduct.description} />
            </Grid>
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

export async function getServerSideProps({ params }: any) {
  const slug = params.slug;

  try {
    const productData = await shopifyClient.product.fetchByHandle(slug);

    const isVariable = (variants: any) => {
      if(variants.length > 1){
        return true
      }

      return false
    }

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

      options: productData.options.map((option:any) => ({
        id: option.id,
        name: option.name,
        values: option.values.map((value: any) => ({
          value: value.value, // Accede al valor real
        }))
      })),
      isVariable: isVariable(productData.variants),
      variants: productData.variants.map(variant => ({
        variantId: variant.id,
        title: variant.title,
        price: variant.price.amount,
        selectedOptions: variant.selectedOptions.map(selectOption => ({
          name: selectOption.name,
          value: selectOption.value
        }))
      }))
      
    };

    return {
      props: {
        product,
        relatedProductsIds: [],
      },
    };
  } catch (error) {
    console.log(error);
  }
}
