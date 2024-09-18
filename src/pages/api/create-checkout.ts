// pages/api/create-checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import shopifyClient from '@/lib/shopify';
import type { ItemCart } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;
      const checkout = await shopifyClient.checkout.create();
      if (items.length > 0) {
        const lineItemsToAdd = items.map((item: ItemCart) => {
          const variantId = item.isVariable
            ? item.id
            : item.variants && item.variants.length > 0
            ? item.variants[0].variantId
            : item.id;
        
          return {
            variantId,
            quantity: item.quantity,
            properties: {
              mediaUrl: item.mediaUrl// Agregar la URL de la imagen a las propiedades del checkout (opcional)
            }
          };
        });

        const newCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
        res.status(200).json(newCheckout);
      } else {
        res.status(400).json({ message: 'No items received' });
      }
    } catch (error) {
      console.error('Error al crear el checkout:', error);
      res.status(500).json({ message: 'Error al crear el checkout' , error: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
