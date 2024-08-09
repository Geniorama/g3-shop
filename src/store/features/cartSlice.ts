import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ItemCart } from "@/types";

type CartState = {
  items: ItemCart[];
  totalAmount: number;
  checkoutId: string | null;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  checkoutId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemCart>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount += action.payload.salePrice ?  action.payload.salePrice : action.payload.normalPrice * action.payload.quantity;
    },
    removeItem: (state, action: PayloadAction<ItemCart['id']>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
      if (existingItemIndex !== -1) {
        state.totalAmount -= (state.items[existingItemIndex].salePrice || state.items[existingItemIndex].normalPrice) * state.items[existingItemIndex].quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },
    setCheckoutId: (state, action: PayloadAction<string>) => {
      state.checkoutId = action.payload;
    },
  }
});

export const { addItem, removeItem, setCheckoutId } = cartSlice.actions;
export default cartSlice.reducer;
