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
import { fetchContactInfo, fetchLatestProducts, fetchSocialMedia, fetchSliderHome } from "@/lib/dataFetchers";
import RateUs from "@/components/Home/RateUs/RateUs";
import type { Slide } from "@/components/Home/SliderHome/SliderHome";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[];
  contactInfo: ContactInfo;
  socialMedia: SocialMediaItem[];
  slidersHome: []
};

export default function Home({ products, contactInfo, socialMedia, slidersHome }: HomeProps) {
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [listProducts, setListProducts] = useState<Product[]>();
  const [slides, setSlides] = useState<Slide[]>()

  const dispatch = useDispatch()

  useEffect(() => {
    if (products) {
      setListProducts(products);
    }
    AOS.init();
  }, [products]);

  useEffect(() => {
    if(slidersHome){
      const transformData:Slide[] = slidersHome.map((slide:any) => ({
        title: slide.fields.title,
        titleSmall: slide.fields.titleSmall,
        titleLarge: slide.fields.titleLarge,
        description: slide.fields.description,
        buttonText: slide.fields.buttonText,
        buttonUrl: slide.fields.buttonUrl,
        backgroundColor: slide.fields.backgroundColor,
        imageUrl: slide.fields.imageUrl,
        imageAlignment: slide.fields.imageAlignment,
        iconUrl: slide.fields.iconUrl
      }))

      setSlides(transformData)
    }
  },[slidersHome])

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
      {slides && <SliderHome slides={slides} />}
      <Features />
      {listProducts && <ExploreOurProducts products={listProducts} />}
      <ProductCategories />
      <MostPopular />
      <Techniques />
      <BannerPromo />
      <FAQ />
      <RateUs />
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
  const slidersHome = await fetchSliderHome()

  return {
    props: {
      products,
      contactInfo,
      socialMedia,
      slidersHome
    }
  }
}
