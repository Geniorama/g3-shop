import Client from 'shopify-buy'

const shopifyClient = new Client({
    domain: `${process.env.SHOPIFY_STORE_DOMAIN}`,
    storefrontAccessToken: `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
    apiVersion: "2024-04",
})

export default shopifyClient