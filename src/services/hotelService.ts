import type { Hotel, Room, Review, GalleryImage } from "@/types/HotelTypes";
import apiClient from "./apiClient";

export const getHotelDetails = async (): Promise<Hotel[]> => {
  const res = await apiClient.get("/hotels");
  return res.data;
};

export const getAvailableRooms = async (): Promise<Room[]> => {
  const res = await apiClient.get("/hotels/available-rooms");
  return res.data;
};

export const getHotelGallery = async (): Promise<GalleryImage[]> => {
  const res = await apiClient.get("/hotels/gallery");
  return res.data;
};

export const getHotelReviews = async (): Promise<Review[]> => {
  const res = await apiClient.get("/hotels/reviews");
  return res.data;
};

const hotelService = {
  getHotelDetails,
  getAvailableRooms,
  getHotelGallery,
  getHotelReviews,
};

export default hotelService;
