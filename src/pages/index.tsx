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
import { GraphQLClient } from "graphql-request";
import { useDispatch } from "react-redux";
import { setContactInfo, setSocialMedia } from "@/store/features/generalInfoSlice";
import { fetchContactInfo, fetchLatestProducts, fetchSocialMedia, fetchSliderHome, fetchFeatures, fetchTechniques } from "@/lib/dataFetchers";
import RateUs from "@/components/Home/RateUs/RateUs";
import type { Slide } from "@/components/Home/SliderHome/SliderHome";
import type { Feature } from "@/components/Home/Features/Features";
import type {CircleTechniqueProps} from "@/components/CircleTechnique/CircleTechnique";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[];
  contactInfo: ContactInfo;
  socialMedia: SocialMediaItem[];
  slidersHome: [];
  features:[];
  techniques:[];
};

export default function Home({ products, contactInfo, socialMedia, slidersHome, features, techniques }: HomeProps) {
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [listProducts, setListProducts] = useState<Product[]>();
  const [slides, setSlides] = useState<Slide[]>()
  const [listFeatures, setListFeatures] = useState<Feature[]>()
  const [listTechniques, setListTechniques] = useState<CircleTechniqueProps[]>()

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
    if(features){
      const transformData:Feature[] = features.map((feature:any) => ({
        icon: feature.fields.iconUrl,
        title: feature.fields.title
      }))  
      
      setListFeatures(transformData)
    }
  },[features])

  useEffect(() => {
    if(techniques){
      const transformData:CircleTechniqueProps[] = techniques.map((tech:any) => ({
        title: tech.fields.title,
        color: '',
        image: {
          src: tech.fields.imageUrl,
          altText: tech.fields.altText
        }
      }))  
      
      setListTechniques(transformData)
    }
  },[techniques])

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
      {slides && slides.length > 0 && <SliderHome slides={slides} />}
      {listFeatures && listFeatures.length > 0 && <Features features={listFeatures} />}
      {listProducts && <ExploreOurProducts products={listProducts} />}
      <ProductCategories />
      <MostPopular />
      {listTechniques && listTechniques.length > 0 && <Techniques techniques={listTechniques} />}
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
  const features = await fetchFeatures()
  const techniques = await fetchTechniques()

  return {
    props: {
      products,
      contactInfo,
      socialMedia,
      slidersHome,
      features,
      techniques
    }
  }
}
