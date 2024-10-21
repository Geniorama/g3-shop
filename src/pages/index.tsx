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
import { useDispatch } from "react-redux";
import {
  setContactInfo,
  setSocialMedia,
} from "@/store/features/generalInfoSlice";
import {
  fetchContactInfo,
  fetchLatestProducts,
  fetchSocialMedia,
  fetchSliderHome,
  fetchFeatures,
  fetchTechniques,
  fetchPromoDay,
  fetchFaq,
  fetchGeneralSettings,
  fetchProductCategories
} from "@/lib/dataFetchers";
import RateUs from "@/components/Home/RateUs/RateUs";
import type { Slide } from "@/components/Home/SliderHome/SliderHome";
import type { Feature } from "@/components/Home/Features/Features";
import type { CircleTechniqueProps } from "@/components/CircleTechnique/CircleTechnique";
import type { MostPopularProps } from "@/components/Home/MostPopular/MostPopular";
import type { Faq } from "@/components/Home/FAQ/FAQ";
import type { Entry } from "contentful";
import type { CardCategoryProps } from "@/components/Shop/CardCategory/CardCategory";
import LoaderPage from "@/components/Loader/LoaderPage";
import useCommingSoon from "@/hooks/useCommingSoon";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[];
  contactInfo: ContactInfo;
  socialMedia: SocialMediaItem[];
  slidersHome: [];
  features: [];
  techniques: [];
  promoDay: any;
  faqs: [];
  commingSoonMode: Entry;
  bannerCategories: []
};

export default function Home({
  products,
  contactInfo,
  socialMedia,
  slidersHome,
  features,
  techniques,
  promoDay,
  faqs,
  commingSoonMode,
  bannerCategories
}: HomeProps) {
  const [listProducts, setListProducts] = useState<Product[]>();
  const [slides, setSlides] = useState<Slide[]>();
  const [listFeatures, setListFeatures] = useState<Feature[]>();
  const [listTechniques, setListTechniques] =
    useState<CircleTechniqueProps[]>();
  const [itemPromoDay, setItemPromoDay] = useState<MostPopularProps>();
  const [listFaqs, setListFaqs] = useState<Faq[]>();
  const [listBannerCategories, setListBannerCategories] = useState<CardCategoryProps[]>()

  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      setListProducts(products);
    }
    AOS.init();
  }, [products]);

  useEffect(() => {
    if (slidersHome) {
      const transformData: Slide[] = slidersHome.map((slide: any) => ({
        title: slide.fields.title,
        titleSmall: slide.fields.titleSmall,
        titleLarge: slide.fields.titleLarge,
        description: slide.fields.description,
        buttonText: slide.fields.buttonText,
        buttonUrl: slide.fields.buttonUrl,
        backgroundColor: slide.fields.backgroundColor,
        imageUrl: slide.fields.imageUrl,
        imageAlignment: slide.fields.imageAlignment,
        iconUrl: slide.fields.iconUrl,
      }));

      setSlides(transformData);
    }
  }, [slidersHome]);

  useEffect(() => {
    if(bannerCategories){
      console.log(bannerCategories)
      const transformData = bannerCategories.map((item: any) => ({
        titleSmall: item.fields.titleSmall,
        title: item.fields.titleLarge,
        buttonLink: item.fields.buttonLink,
        buttonText: item.fields.buttonText,
        image: item.fields.image
      }))

      setListBannerCategories(transformData)
    }
  },[bannerCategories])

  useEffect(() => {
    if (faqs) {
      const transformData: Faq[] = faqs.map((faq: any) => ({
        question: faq.fields.question,
        answer: faq.fields.answer,
      }));

      setListFaqs(transformData);
    }
  }, [faqs]);

  useEffect(() => {
    if (features) {
      const transformData: Feature[] = features.map((feature: any) => ({
        icon: feature.fields.iconUrl,
        title: feature.fields.title,
      }));

      setListFeatures(transformData);
    }
  }, [features]);

  useEffect(() => {
    if (techniques) {
      const transformData: CircleTechniqueProps[] = techniques.map(
        (tech: any) => ({
          title: tech.fields.title,
          color: "",
          image: {
            src: tech.fields.imageUrl,
            altText: tech.fields.altText,
          },
        })
      );

      setListTechniques(transformData);
    }
  }, [techniques]);

  useEffect(() => {
    if (promoDay) {
      const transformData: MostPopularProps = {
        title: promoDay.fields.title,
        imageUrl: promoDay.fields.imageUrl,
        description: promoDay.fields.description,
        buttonLink: promoDay.fields.buttonLink,
        buttonText: promoDay.fields.buttonText,
      };

      setItemPromoDay(transformData);
    }
  }, [promoDay]);

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

  if (isLoadingPage) {
    return <LoaderPage />;
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
      {slides && slides.length > 0 && <SliderHome slides={slides} />}
      {listFeatures && listFeatures.length > 0 && (
        <Features features={listFeatures} />
      )}
      {listProducts && <ExploreOurProducts products={listProducts} />}
      <ProductCategories
        title="Product categories"
        categories={listBannerCategories}
      />
      {itemPromoDay && (
        <MostPopular
          title={itemPromoDay.title}
          description={itemPromoDay.description}
          imageUrl={itemPromoDay.imageUrl}
          buttonText={itemPromoDay.buttonText}
          buttonLink={itemPromoDay.buttonLink}
        />
      )}
      {listTechniques && listTechniques.length > 0 && (
        <Techniques techniques={listTechniques} />
      )}
      <BannerPromo />
      {listFaqs && listFaqs.length > 0 && <FAQ faqs={listFaqs} />}
      <RateUs />
    </Layout>
  );
}

export async function getServerSideProps() {
  const products = await fetchLatestProducts();
  const contactInfo = await fetchContactInfo();
  const socialMedia = await fetchSocialMedia();
  const slidersHome = await fetchSliderHome();
  const features = await fetchFeatures();
  const techniques = await fetchTechniques();
  const promoDay = await fetchPromoDay();
  const faqs = await fetchFaq();
  const commingSoonMode = await fetchGeneralSettings();
  const bannerCategories = await fetchProductCategories();

  return {
    props: {
      products,
      contactInfo,
      socialMedia,
      slidersHome,
      features,
      techniques,
      promoDay,
      faqs,
      commingSoonMode,
      bannerCategories
    },
  };
}
