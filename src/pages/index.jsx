import Layout from '@/components/Layout/Layout';
import SliderHome from '@/components/SliderHome/SliderHome';
import Features from '@/components/Features/Features';
import ExploreOurProducts from '@/components/ExploreOurProducts/ExploreOurProducts';
import ProductCategories from '@/components/Shop/ProductCategories/ProductCategories';
import MostPopular from '@/components/MostPopular/MostPopular';
import Techniques from '@/components/Techniques/Techniques';
import BannerPromo from '@/components/Home/BannerPromo/BannerPromo';
import FAQ from '@/components/FAQ/FAQ';
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const metadata = {
  title: 'Inicio',
  description: 'Hello world'
}

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <Layout metadata={metadata}>
      <SliderHome />
      <Features />
      <ExploreOurProducts />
      <ProductCategories />
      <MostPopular />
      <Techniques />
      <BannerPromo />
      <FAQ />
    </Layout>
  )
}
