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
import type { Product } from "@/types";
import { GraphQLClient, gql } from "graphql-request";
import { GET_LATEST_PRODUCTS } from "@/lib/queries";

const metadata = {
  title: "Inicio",
  description: "Hello world",
};

type HomeProps = {
  products: Product[];
};

export default function Home({ products }: HomeProps) {
  const [isCommingSoon, setIsCommingSoon] = useState(false);
  const [listProducts, setListProducts] = useState<Product[]>();
  useEffect(() => {
    if (products) {
      console.log(products);
      setListProducts(products);
    }
    AOS.init();
  }, [products]);

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
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
  try {
    const data:any = await client.request(GET_LATEST_PRODUCTS, { first: 8 });

    const products = data.products.edges.map(({ node }:any) => ({
      id: node.id,
      title: node.title,
      image: {
        url: node.images.edges[0]?.node.src,
        altText: node.images.edges[0]?.node.altText || '',
      },
      normalPrice: parseFloat(node.variants.edges[0]?.node.price.amount),
      isVariable: node.variants.edges.length > 1,
      gallery: node.images.edges.map((image:any) => ({
        url: image.node.src,
        altText: image.node.altText,
      })),
      slug: node.handle,
      createdAt: node.createdAt,
    }));

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
