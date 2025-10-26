import type {
  FeaturedDealResponse,
  RecentlyVisitedResponse,
  TrendingDestinationResponse,
} from "@/types/homeTypes";
import apiClient from "./apiClient";
import type { Destination } from "@/types/destinations";

export const getFeaturedDeals = async (): Promise<FeaturedDealResponse[]> => {
  const res = await apiClient.get("/home/featured-deals");
  return res.data;
};

export const getRecentlyVisited = async (): Promise<
  RecentlyVisitedResponse[]
> => {
  const res = await apiClient.get("/home/users/2/recent-hotels");
  return res.data;
};

export const getTrendingDestinations = async (): Promise<
  TrendingDestinationResponse[]
> => {
  const res = await apiClient.get("/home/destinations/trending");
  return res.data;
};

export const getDestinationsCites = async (
  id: number
): Promise<Destination> => {
  const res = await apiClient.get(`/home/destinations/cities/${id}`);
  return res.data;
};

const homeService = {
  getFeaturedDeals,
  getRecentlyVisited,
  getTrendingDestinations,
  getDestinationsCites,
};

export default homeService;
