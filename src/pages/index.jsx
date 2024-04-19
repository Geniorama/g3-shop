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
import { useEffect } from "react";
import storefront from "../utils";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

export default function Home({products}) {
  useEffect(() => {
    AOS.init();
  }, []);

  console.log(products)
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
  );
}

const gql = String.raw;

const productsQuery = gql`
  query Products {
    products(first: 6) {
      edges {
        node {
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;



export async function getStaticProps() {
  try {
    const { data } = await storefront(productsQuery);
    if (!data || !data.products) {
      throw new Error('No se pudo obtener la lista de productos');
    }
    return {
      props: {
        products: data.products
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    return {
      props: {
        products: [] // Devuelve una lista vacía en caso de error
      }
    };
  }
}


