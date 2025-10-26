import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import searchService from "@/services/searchService";
import type { SearchParams } from "@/types/search";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHotels,
  selectSearchParams,
} from "@/features/search/searchSelector";
import {
  setError,
  setHotels,
  setLoading,
  setSearchParams,
} from "@/features/search/searchSlice";

export const useSearchQueries = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSelector(selectSearchParams);
  const hotels = useSelector(selectHotels);

  const { isLoading: isAllHotelsLoading, isError: isAllHotelsError } = useQuery(
    {
      queryKey: ["hotels"],
      queryFn: async () => {
        dispatch(setLoading(true));
        try {
          const data = await searchService.getHotels();
          dispatch(setHotels(data));
          return data;
        } catch (err) {
          dispatch(setError("Failed to fetch hotels"));
          throw err;
        } finally {
          dispatch(setLoading(false));
        }
      },
      staleTime: 5 * 60 * 1000,
    }
  );

  const searchMutation = useMutation({
    mutationFn: async (params: SearchParams) => {
      dispatch(setLoading(true));
      dispatch(setSearchParams(params));
      const data = await searchService.getSearchedHotels(params);
      return data;
    },
    onSuccess: (data) => {
      dispatch(setHotels(data));
      queryClient.setQueryData(["hotels"], data);
      dispatch(setLoading(false));
    },
    onError: () => {
      dispatch(setError("Search failed"));
      dispatch(setLoading(false));
    },
  });

  const searchHotels = (params: SearchParams) => {
    if (!params) return;
    searchMutation.mutate(params);
  };

  return {
    hotels,
    searchParams,
    searchHotels,
    isAllHotelsLoading,
    isAllHotelsError,
  };
};
