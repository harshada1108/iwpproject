import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
  searchResults: [], // Search results for suggestions
  finalproduct : [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    setCartItems: (state, action) => {
      state.cartItem = action.payload.map(item => {
        const productId = item.productId;
        return {
          productId: productId._id,
          name: productId.name,
          image: productId.image,
          category: productId.category,
          qty: 1,
          total: item.total || (parseFloat(productId.price) * item.qty),
          price: parseFloat(productId.price),
        };
      });
    },
    ResetCartItems: (state) => {
      state.finalproduct = [...state.cartItem]; // Copy cartItem to finalproduct
      state.cartItem = []; // Clear the cart items
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("Selected item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;

      state.cartItem[index].qty = qtyInc;
      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    setSearchResults: (state, action) => {
      const { searchText, category } = action.payload;
      state.searchResults = state.productList.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = category ? product.category === category : true;
        return matchesSearch && matchesCategory;
      });
    },
  
  },
});

// Helper function to log the cartItems
const logCartItems = (state) => {
  console.log("Updated cart items:", state.cartItem);
};

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setCartItems,
  ResetCartItems,
  setSearchResults, // Export new reducer
} = productSlice.actions;

export default productSlice.reducer;
