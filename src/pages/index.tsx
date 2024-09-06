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
import type { ContactInfo, Product, SocialMediaItem } from "@/types";
import { GraphQLClient, gql } from "graphql-request";
import { GET_LATEST_PRODUCTS } from "@/lib/queries";
import contentfulClient from "@/lib/contentful";
import { useDispatch } from "react-redux";
import { setContactInfo, setSocialMedia } from "@/store/features/generalInfoSlice";
import { fetchContactInfo, fetchLatestProducts, fetchSocialMedia } from "@/lib/dataFetchers";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[];
  contactInfo: ContactInfo;
  socialMedia: SocialMediaItem[]
};

export default function Home({ products, contactInfo, socialMedia }: HomeProps) {
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [listProducts, setListProducts] = useState<Product[]>();

  const dispatch = useDispatch()

  useEffect(() => {
    if (products) {
      setListProducts(products);
    }
    AOS.init();
  }, [products]);

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

  if (isCommingSoon) {
    return <CommingSoon />;
  }
  
  return (
    <Layout 
      metadata={metadata}
      >
      <SliderHome />
      <Features />
      {listProducts && <ExploreOurProducts products={listProducts} />}
      <ProductCategories />
      <MostPopular />
      <Techniques />
      <BannerPromo />
      <FAQ />
    </Layout>
  );
}

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}`, {
  headers: {
    "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function getServerSideProps() {
  const products = await fetchLatestProducts()
  const contactInfo = await fetchContactInfo()
  const socialMedia = await fetchSocialMedia()

  return {
    props: {
      products,
      contactInfo,
      socialMedia
    }
  }
}
