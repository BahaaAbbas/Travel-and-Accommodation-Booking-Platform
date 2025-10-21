import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Hotel, SearchParams } from "@/types/search";
import type { Filters, SearchState } from "../types";

const initialState: SearchState = {
  hotels: [],
  searchParams: {},
  filters: {
    priceRange: [0, 1000],
    selectedStars: [],
    selectedAmenities: [],
    selectedRoomTypes: [],
  },
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.searchParams = {};
      state.hotels = [];
      state.filters = {
        priceRange: [0, 1000],
        selectedStars: [],
        selectedAmenities: [],
        selectedRoomTypes: [],
      };
      state.error = null;
    },
  },
});

export const {
  setHotels,
  setSearchParams,
  setFilters,
  setLoading,
  setError,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
