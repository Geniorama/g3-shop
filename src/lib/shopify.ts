import Client from 'shopify-buy'

const shopifyClient = new Client({
    domain: `${process.env.SHOPIFY_STORE_DOMAIN}`,
    storefrontAccessToken: `${process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
    apiVersion: "2024-07",
})

export const createCheckout = async () => {
    try {
      const checkout = await shopifyClient.checkout.create();
      return checkout;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };
  
  export const addLineItems = async (checkoutId: string, lineItems: any) => {
    try {
      const checkout = await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
      return checkout;
    } catch (error) {
      console.error('Error adding line items:', error);
      throw error;
    }
  };

export default shopifyClient