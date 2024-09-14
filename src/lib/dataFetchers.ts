import contentfulClient from "./contentful";
import { GraphQLClient, gql } from "graphql-request";
import { GET_LATEST_PRODUCTS, GET_COLLECTION_BY_SLUG, GET_ALL_PRODUCTS } from "./queries";
import type { ShopifyCollectionResponse, ShopifyProductsResponse } from "@/types";

const shopifyClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_SHOPIFY_API_URL}`,
  {
    method: 'POST',
    headers: {
      "X-Shopify-Storefront-Access-Token": `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  }
);

export const fetchAllProducts = async (cursor: string | null = null, first: number) => {
  try {
    const data: ShopifyProductsResponse = await shopifyClient.request(GET_ALL_PRODUCTS, { cursor, first: first || 9 });
    return data;
  } catch (error: any) {
    console.error("Error fetching all products:", error?.response?.errors || error?.message || error);
  }
}

// Fetch products
export const fetchLatestProducts = async () => {
  try {
    const data: any = await shopifyClient.request(GET_LATEST_PRODUCTS, {
      first: 8,
    });

    const productsData = data.products.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      image: {
        url: node.images.edges[0]?.node.src,
        altText: node.images.edges[0]?.node.altText || "",
      },
      normalPrice: parseFloat(node.variants.edges[0]?.node.price.amount),
      isVariable: node.variants.edges.length > 1,
      gallery: node.images.edges.map((image: any) => ({
        url: image.node.src,
        altText: image.node.altText,
      })),
      slug: node.handle,
      createdAt: node.createdAt,
    }));

    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch contact info
export const fetchContactInfo = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "contactInfo",
      limit: 1,
    });

    return res.items[0]?.fields || {};
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
};

// Fetch Slider Home
export const fetchSliderHome = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "sliderHome",
    });

    return res.items;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
};

export const fetchFeatures = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "features",
    });

    return res.items;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
};

export const fetchTechniques = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "techniques",
    });

    return res.items;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
};

export const fetchPromoDay = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "promoDay",
    });

    const item = res.items[0]

    return item;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
};

export const fetchCustomMenu = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "customMenu",
    });

    return res.items;
  } catch (error) {
    console.error("Error fetching custom menu:", error);
    return {};
  }
};

// Fetch policies
export const fetchPolicies = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "policies",
      limit: 1
    })

    return res.items[0]?.fields || {}
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return {};
  }
}

// Fetch social media
export const fetchSocialMedia = async () => {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "socialMedia",
    });

    return res.items.map((item: any) => ({
      name: item.fields.name,
      url: item.fields.url,
    }));
  } catch (error) {
    console.error("Error fetching social media:", error);
    return [];
  }
};

export const fetchCollectionBySlug = async (slug: string, cursor: string | null = null) => {
  try {
    const res: ShopifyCollectionResponse = await shopifyClient.request(
      GET_COLLECTION_BY_SLUG,
      { slug, cursor }
    );

    return res;
  } catch (error) {
    console.error("Error fetching collection:", error);

    // Verificar el tipo de error
    if (error instanceof Error) {
      // El error es una instancia de Error, puedes acceder a error.message
      console.error("Error message:", error.message);
    } else {
      // Manejo para otros tipos de error
      console.error("Unexpected error:", error);
    }

    // Manejo para errores más específicos de GraphQL
    if (typeof error === 'object' && error !== null) {
      const errorObj = error as { response?: any; request?: any; message?: string };

      if (errorObj.response) {
        console.error("Response details:", errorObj.response);
      }
      if (errorObj.request) {
        console.error("Request details:", errorObj.request);
      }
      if (errorObj.message) {
        console.error("Error details:", errorObj.message);
      }
    }

    return null; // O maneja el error de otra forma adecuada para tu caso
  }
};


