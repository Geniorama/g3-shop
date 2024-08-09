import { createAsyncThunk } from "@reduxjs/toolkit";
import shopifyClient from "@/lib/shopify";
import { ItemCart } from "@/types";

export const createCheckout = createAsyncThunk<string, ItemCart[]>(
  'cart/createCheckout',
  async (items, { rejectWithValue }) => {
    try {
      // Realiza la llamada a tu API o servicio aquí
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      return data.checkoutId; // Asegúrate de retornar solo el ID
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addLineItems = createAsyncThunk(
  'cart/addLineItems',
  async ({ checkoutId, items }: { checkoutId: string; items: ItemCart[] }, { rejectWithValue }) => {
    try {
      const checkout = await shopifyClient.checkout.addLineItems(checkoutId, items.map(item => ({
        variantId: item.id,
        quantity: item.quantity,
      })));
      return checkout;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeLineItem = createAsyncThunk(
  'cart/removeLineItem',
  async ({ checkoutId, lineItemId }: { checkoutId: string; lineItemId: string }, { rejectWithValue }) => {
    try {
      const checkout = await shopifyClient.checkout.removeLineItems(checkoutId, [lineItemId]);
      return checkout;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
