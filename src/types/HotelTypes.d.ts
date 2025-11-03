export interface Amenity {
  id: number;
  name: string;
  description: string;
}

export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  hotelName?: string;
  hotelLocation?: string;
  roomAmenities?: Amenity[];
  price: number;
  availability: boolean;
}

export interface Hotel {
  hotelId: number;
  hotelName: string;
  location: string;
  description?: string;
  hotelType?: string;
  starRating: number;
  latitude: number;
  longitude: number;
  cityId?: number;
  cityName: string;
  imageUrl?: string;
  roomPrice?: number;
  discount?: number;
  numberOfChildren?: number;
  numberOfAdults?: number;
  numberOfRooms?: number;
  checkInDate?: string;
  checkOutDate?: string;
  amenities: Amenity[];
  rooms?: Room[];
  availableRooms?: number;
}

export interface Review {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}

export interface GalleryImage {
  id: number;
  url: string;
}

export interface AvailableRoomsProps {
  rooms: Room[];
  isLoading?: boolean;
}

export interface CartItem {
  roomPhotoUrl: string;
  roomType: string;
  roomNumber: number | string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
}

export interface HotelCart {
  hotelName: string;
  location: string;
}

export interface CartSummaryProps {
  cart: CartItem[];
  hotel: HotelCart;
}

export interface HotelMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  hotelName?: string;
}

export interface HotelSliderProps {
  images: string[];
}

export interface CartItem
  extends Pick<
    Room,
    | "roomPhotoUrl"
    | "roomType"
    | "roomNumber"
    | "capacityOfAdults"
    | "capacityOfChildren"
    | "price"
  > {}

export interface CartSummaryProps {
  cart: CartItem[];
  hotel: HotelCart;
}


export interface HotelGroup {
  hotelName: string;
  hotelLocation?: string;
  rooms: Room[];
}
