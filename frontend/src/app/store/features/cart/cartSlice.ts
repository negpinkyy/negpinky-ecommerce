
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../../types/cart";
import { Products } from "@/interfaces/products";

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  selectedItems: 0,
  tax: 0,
  taxRate: 0.15,
  grandTotal: 0,
};

const setSelectedItems = (state: CartState) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

const setTotalPrice = (state: CartState) =>
  state.products.reduce((total, product) => total + product.price * product.quantity, 0);

const setTax = (state: CartState) => setTotalPrice(state) * state.taxRate;

const setGrandTotal = (state: CartState) => setTotalPrice(state) + setTax(state);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Products>) => {
      const isExist = state.products.find(
        (product) => product.slug === action.payload.slug
      );

      if (!isExist) {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        console.log("Item already added to cart");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ slug: string; type: "increment" | "decrement" }>
    ) => {
      const product = state.products.find((p) => String(p.slug) === String(action.payload.slug));
      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1;
        } else if (action.payload.type === "decrement") {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeFromCart:(state, action: PayloadAction<Products>) =>{
      state.products = state.products.filter(
        (product) => product.slug !== action.payload.slug
      );

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
