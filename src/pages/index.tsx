import Layout from '@/components/Layout/Layout';
import SliderHome from '@/components/SliderHome/SliderHome';
import Features from '@/components/Features/Features';
import ExploreOurProducts from '@/components/ExploreOurProducts/ExploreOurProducts';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import MostPopular from '@/components/MostPopular/MostPopular';
import Techniques from '@/components/Techniques/Techniques';
import BannerPromo from '@/components/BannerPromo/BannerPromo';
import FAQ from '@/components/FAQ/FAQ';

const metadata = {
  title: 'Inicio',
  description: 'Hello world'
}

export default function Home() {
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
