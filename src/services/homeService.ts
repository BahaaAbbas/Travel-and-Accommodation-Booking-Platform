import type {
  FeaturedDealResponse,
  RecentlyVisitedResponse,
  TrendingDestinationResponse,
} from "@/types/homeTypes";
import apiClient from "./apiClient";

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

const homeService = {
  getFeaturedDeals,
  getRecentlyVisited,
  getTrendingDestinations,
};

export default homeService;
