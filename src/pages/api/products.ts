// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import shopifyClient from "@/lib/shopify";
import type { Product } from "@/types";

const PRODUCTS_PER_PAGE = 9;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, limit = PRODUCTS_PER_PAGE, collectionSlug } = req.query;

  try {
    let products: ShopifyBuy.Product[] = [];

    if (collectionSlug) {
      // Filter by collection if collectionSlug is provided
      const collection = await shopifyClient.collection.fetchByHandle(collectionSlug as string);
      products = collection.products;
    } else {
      // Fetch all products if no collectionSlug is provided
      const fetchProducts = await shopifyClient.product.fetchAll();
      products = fetchProducts;
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);

    const productsPage = products.slice(startIndex, endIndex);

    const serializableProducts: Product[] = productsPage.map((product:any) => ({
      id: product.id,
      title: product.title,
      image: {
        url: product.images[0]?.src || "",
        altText: product.images[0]?.altText || "",
      },
      description: product.descriptionHtml,
      normalPrice: product.variants[0]?.price.amount,
      isVariable: product.variants.length > 1,
      gallery: product.images
        ? product.images.map((image:any) => ({
            url: image.src,
            altText: image.altText,
          }))
        : [],
      slug: product.handle,
    }));

    res.status(200).json({ products: serializableProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ products: [] });
  }
}
