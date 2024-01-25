import Layout from '@/components/Layout/Layout';
import SliderHome from '@/components/Home/SliderHome/SliderHome';
import Features from '@/components/Home/Features/Features';
import ExploreOurProducts from '@/components/Home/ExploreOurProducts/ExploreOurProducts';
import ProductCategories from '@/components/Shop/ProductCategories/ProductCategories';
import MostPopular from '@/components/Home/MostPopular/MostPopular';
import Techniques from '@/components/Home/Techniques/Techniques';
import BannerPromo from '@/components/Home/BannerPromo/BannerPromo';
import FAQ from '@/components/Home/FAQ/FAQ';
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
