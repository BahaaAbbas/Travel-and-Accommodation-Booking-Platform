import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../types";
import type { Room } from "@/types/HotelTypes";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Room>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Room>) => {
      const index = state.items.findIndex(
        (item: Room) => item.roomId === action.payload.roomId
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item: Room) => item.roomId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
