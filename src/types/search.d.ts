import type { Hotel, Amenity, Room } from "./HotelTypes";

export interface SearchParams {
  query?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
}

export interface SearchCardProps {
  hotel: Pick<
    Hotel,
    | "hotelId"
    | "hotelName"
    | "cityName"
    | "starRating"
    | "roomPrice"
    | "discount"
    | "imageUrl"
  > & {
    roomType?: string;
    amenities?: string[];
    roomPhotoUrl?: string;
  };
  onViewDetails?: (hotelId: number) => void;
}

export interface SearchWithCheckProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (params: SearchParams) => void;
}
