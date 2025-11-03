export interface Overview {
  totalCities: number;
  totalCountries: number;
  totalHotelsAcrossCities: number;
  totalRegisteredHotels: number;
  totalRooms: number;
  availableRooms: number;
  unavailableRooms: number;
  occupancyRate: number;
  averageCapacityPerRoom: number;
}

export interface TopCityByHotels {
  cityName: string;
  hotelCount: number;
  percentage: number;
}

export interface HotelStarDistribution {
  starRating: number;
  count: number;
  percentage: number;
}

export interface RoomAvailability {
  available: number;
  unavailable: number;
  total: number;
  occupancyRate: number;
}

export interface Stats {
  overview: Overview;
  topCitiesByHotels: TopCityByHotels[];
  hotelStarDistribution: HotelStarDistribution[];
  roomAvailability: RoomAvailability;
}
