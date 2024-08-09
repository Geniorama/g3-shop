import Layout from "@/components/Layout/Layout";
import SliderHome from "@/components/Home/SliderHome/SliderHome";
import Features from "@/components/Home/Features/Features";
import ExploreOurProducts from "@/components/Home/ExploreOurProducts/ExploreOurProducts";
import ProductCategories from "@/components/Shop/ProductCategories/ProductCategories";
import MostPopular from "@/components/Home/MostPopular/MostPopular";
import Techniques from "@/components/Home/Techniques/Techniques";
import BannerPromo from "@/components/Home/BannerPromo/BannerPromo";
import FAQ from "@/components/Home/FAQ/FAQ";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import shopifyClient from "@/lib/shopify";
import type { Product } from "@/types";


const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [isCommingSoon, setIsCommingSoon] = useState(false)
  const [listProducts, setListProducts] = useState<Product[]>()
  useEffect(() => {
    if(products){
      console.log(products)
      setListProducts(products)
    }
    AOS.init();
  }, [products]);

  if(isCommingSoon){
    return(
      <CommingSoon />
    )
  }
  
  return (
    <Layout metadata={metadata}>
      <SliderHome />
      <Features />
      {listProducts && (
        <ExploreOurProducts products={listProducts} />
      )}
      <ProductCategories />
      <MostPopular />
      <Techniques />
      <BannerPromo />
      <FAQ />
    </Layout>
  );
}

export async function getStaticProps(){
  try {
    const fetchProducts = await shopifyClient.product.fetchAll()

    const serializableProducts:Product[] = fetchProducts.map(product => ({
      id: product.id,
      title: product.title,
      image: {
        url: product.images[0].src,
        altText: product.images[0].altText
      },
      description: product.descriptionHtml,
      normalPrice: product.variants[0].price.amount,
      isVariable: product.variants.length > 1,
      gallery: product.images ? product.images.map(image => (
        {
          url: image.src,
          altText: image.altText
        }
      )) : [],
      slug: product.handle,
    }))
    
    return {
      props: {
        products: serializableProducts
      }
    }
  } catch (error) {
    console.log(error)
  }
}
