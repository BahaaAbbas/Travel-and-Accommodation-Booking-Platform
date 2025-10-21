export interface SearchCardProps {
  hotel: {
    hotelId: number;
    hotelName: string;
    cityName: string;
    starRating: number;
    roomPrice: number;
    discount?: number;
    roomType?: string;
    amenities?: string[];
    roomPhotoUrl: string;
  };
  onViewDetails?: (hotelId: number) => void;
}

export interface Amenity {
  id: number;
  name: string;
  description: string;
}

export interface Hotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: Amenity[];
  numberOfChildren: number;
  numberOfAdults: number;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface SearchParams {
  query?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
}
