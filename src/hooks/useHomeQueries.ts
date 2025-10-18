import { useQuery } from "@tanstack/react-query";

import type {
  FeaturedDealResponse,
  RecentlyVisitedResponse,
  TrendingDestinationResponse,
} from "@/types/homeTypes";
import homeService from "@/services/homeService";

export const useFeaturedDeals = () =>
  useQuery<FeaturedDealResponse[]>({
    queryKey: ["featuredDeals"],
    queryFn: homeService.getFeaturedDeals,
  });

export const useRecentlyVisited = () =>
  useQuery<RecentlyVisitedResponse[]>({
    queryKey: ["recentHotels"],
    queryFn: homeService.getRecentlyVisited,
  });

export const useTrendingDestinations = () =>
  useQuery<TrendingDestinationResponse[]>({
    queryKey: ["trendingDestinations"],
    queryFn: homeService.getTrendingDestinations,
  });
