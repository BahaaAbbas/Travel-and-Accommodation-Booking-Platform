export interface AuthState {
  token: string | null;
  userType: string | null;
}

export interface LayoutState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
}

export interface Filters {
  priceRange: [number, number];
  selectedStars: string[];
  selectedAmenities: string[];
  selectedRoomTypes: string[];
}

export interface SearchState {
  hotels: Hotel[];
  searchParams: SearchParams;
  filters: Filters;
  isLoading: boolean;
  error: string | null;
}
