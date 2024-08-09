// pages/api/create-checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import shopifyClient from '@/lib/shopify';
import type { ItemCart } from '@/types';
import Shopify  from "shopify-api-node"

const shopify = new Shopify({
    shopName: `g3-print.myshopify.com`,
    accessToken: `3c9add35240c8befeb2ee646b668d94a`,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      // Crear un checkout en Shopify
      const checkout = await shopify.checkout.create({
        lineItems: items.map((item: ItemCart) => ({
          variantId: item.id,
          quantity: item.quantity,
        })),
      });

      res.status(200).json(checkout);
    } catch (error) {
      console.error('Error al crear el checkout:', error);
      res.status(500).json({ error: 'Error al crear el checkout' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
