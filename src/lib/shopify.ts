import Client from 'shopify-buy'
import type { ItemCart } from '@/types';

const shopifyClient = new Client({
    domain: `${process.env.SHOPIFY_STORE_DOMAIN}`,
    storefrontAccessToken: `${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
    apiVersion: "2024-04",
})

export default shopifyClient