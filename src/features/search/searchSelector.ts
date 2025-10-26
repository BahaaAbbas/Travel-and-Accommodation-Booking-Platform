import type { RootState } from "@/store/store";

export const selectHotels = (state: RootState) => state.search.hotels;
export const selectSearchParams = (state: RootState) =>
  state.search.searchParams;
export const selectFilters = (state: RootState) => state.search.filters;
export const selectIsLoading = (state: RootState) => state.search.isLoading;
export const selectError = (state: RootState) => state.search.error;
