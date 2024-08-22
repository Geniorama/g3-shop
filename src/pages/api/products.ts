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

    const totalProducts = products.length; // Total de productos disponibles

    // Validar la página y el límite
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Asegúrate de que la página y el límite sean números válidos
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ products: [], totalProducts: 0 });
    }

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    // Asegúrate de no exceder el número total de productos
    const productsPage = products.slice(startIndex, Math.min(endIndex, totalProducts));

    const serializableProducts: Product[] = productsPage.map((product: any) => ({
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
        ? product.images.map((image: any) => ({
            url: image.src,
            altText: image.altText,
          }))
        : [],
      slug: product.handle,
    }));

    res.status(200).json({ products: serializableProducts, totalProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ products: [], totalProducts: 0 });
  }
}
