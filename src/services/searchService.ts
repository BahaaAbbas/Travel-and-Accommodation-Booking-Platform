import type { City, SearchParams } from "@/types/search";
import apiClient from "./apiClient";
import type { Amenity, Hotel, Room } from "@/types/HotelTypes";

export const getSearchedHotels = async (
  params?: SearchParams
): Promise<Hotel[]> => {
  const res = await apiClient.get("/home/search", { params });
  return res.data;
};

export const getHotels = async (): Promise<Hotel[]> => {
  const res = await apiClient.get("/home/search/hotels");
  return res.data;
};

export const getAmenities = async (): Promise<Amenity[]> => {
  const res = await apiClient.get("/search-results/amenities");
  return res.data;
};

export const getRooms = async (): Promise<Room[]> => {
  const res = await apiClient.get("/hot/rooms");
  console.log("Rooms API response:", res.data);

  const rooms = res.data.map((room: any) => ({
    ...room,
    roomAmenities: room.amenities,
  }));

  return rooms;
};

export const getCities = async (): Promise<City[]> => {
  const res = await apiClient.get("/search-results/amenities");
  return res.data;
};

const searchService = {
  getSearchedHotels,
  getHotels,
  getAmenities,
  getRooms,
  getCities,
};

export default searchService;
