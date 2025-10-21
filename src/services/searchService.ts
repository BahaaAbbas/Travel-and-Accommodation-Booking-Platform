import type { Hotel, SearchParams } from "@/types/search";
import apiClient from "./apiClient";

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

const searchService = {
  getSearchedHotels,
  getHotels,
};

export default searchService;
