import type { Hotel, Room } from "@/types/search";

export interface AuthState {
  token: string | null;
  userType: string | null;
}

export interface LayoutState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
}

interface CartState {
  items: Room[];
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
