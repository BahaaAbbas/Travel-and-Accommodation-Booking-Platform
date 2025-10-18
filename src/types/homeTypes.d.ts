export interface FeaturedDealResponse {
  hotelId: number;
  originalRoomPrice: number;
  discount?: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface RecentlyVisitedResponse {
  hotelId: string;
  hotelName: string;
  starRating: number;
  visitDate: string;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface TrendingDestinationResponse {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  description: string;
  discount?: number;
}

export interface HotelCardProps {
  hotel: Hotel;
  onViewDetails?: (id: string) => void;
}

export interface DestinationCardProps {
  city: string;
  country: string;
  imageUrl: string;
}
