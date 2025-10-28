import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchCard from "@/components/Cards/searchCard";
import SearchFilter from "@/components/SearchFilters";
import SearchWithCheck from "@/components/Search/SearchWithCheck";
import { useSearchQueries } from "@/hooks/useSearchQueries";
import { selectFilters } from "@/features/search/searchSelector";

import {
  Box,
  Grid,
  Typography,
  useTheme,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppDispatch } from "@/features/hooks";
import { clearSearch } from "@/features/search/searchSlice";

import type { Amenity } from "@/types/HotelTypes";

const Search = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  const {
    hotels,
    searchHotels,
    isAllHotelsLoading: isLoading,
    isAllHotelsError: isError,
  } = useSearchQueries();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    const locationParam = searchParams.get("location");

    const searchTerm = queryParam || locationParam;

    if (searchTerm) {
      setSearchText(searchTerm);
      searchHotels({ query: searchTerm });
    } else {
      dispatch(clearSearch());
      searchHotels({});
    }
  }, [searchParams]);

  const filters = useSelector(selectFilters);

  const mappedHotels = useMemo(() => {
    if (!hotels || hotels.length === 0) return [];
    return hotels.map((hotel) => ({
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      cityName: hotel.cityName,
      starRating: hotel.starRating,
      roomPrice: hotel.roomPrice,
      discount: hotel.discount || 0,
      roomType: hotel.roomType,
      amenities: hotel.amenities?.map((a: Amenity) =>
        typeof a === "string" ? a : a.name
      ),
      roomPhotoUrl: hotel.roomPhotoUrl,
    }));
  }, [hotels]);

  const filteredHotels = useMemo(() => {
    if (!mappedHotels) return [];
    return mappedHotels.filter((hotel) => {
      const {
        priceRange,
        selectedStars,
        selectedAmenities,
        selectedRoomTypes,
      } = filters;

      if (
        priceRange &&
        (hotel.roomPrice < priceRange[0] || hotel.roomPrice > priceRange[1])
      )
        return false;
      if (
        selectedStars?.length &&
        !selectedStars.includes(String(hotel.starRating))
      )
        return false;
      if (
        selectedRoomTypes?.length &&
        !selectedRoomTypes.includes(hotel.roomType)
      )
        return false;
      if (
        selectedAmenities?.length &&
        !selectedAmenities.every((a: any) => hotel.amenities?.includes(a))
      )
        return false;

      return true;
    });
  }, [mappedHotels, filters]);

  const defaultFilters = {
    priceRange: [0, 1000],
    selectedStars: [],
    selectedAmenities: [],
    selectedRoomTypes: [],
  };

  const isFiltersDefault =
    filters.priceRange?.[0] === defaultFilters.priceRange[0] &&
    filters.priceRange?.[1] === defaultFilters.priceRange[1] &&
    filters.selectedStars?.length === 0 &&
    filters.selectedAmenities?.length === 0 &&
    filters.selectedRoomTypes?.length === 0;

  const showClearIcon = !searchText && isFiltersDefault;

  const handleViewDetails = (hotelId: number) => {
    console.log("View details for hotel:", hotelId);
    navigate("/hotels/1");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        boxSizing: "border-box",
        pt: "2rem",
        px: "1rem",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        color={theme.palette.text.primary}
        fontWeight={700}
        mb={3}
      >
        Search Results
      </Typography>

      <SearchWithCheck searchText={searchText} setSearchText={setSearchText} />

      <Grid container spacing={4} alignItems="stretch">
        {/* LEFT: Filter sidebar */}
        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
          <SearchFilter />
        </Grid>

        {/* RIGHT: Results */}
        <Grid size={{ xs: 12, sm: 8, md: 8, lg: 9 }}>
          <Box>
            <Paper
              sx={{
                p: 2,
                borderRadius: 1.5,
                mb: 2,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                border: `1px solid ${theme.palette.mutedForeground?.main}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <span
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: 12,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h2"
                  color={theme.palette.text.primary}
                  fontWeight={700}
                >
                  {isLoading
                    ? "Searching..."
                    : filteredHotels?.length
                    ? `${filteredHotels.length} hotels found`
                    : "No hotels found"}
                </Typography>
              </Box>

              {showClearIcon && (
                <IconButton
                  onClick={() => searchHotels({} as any)}
                  sx={{ color: theme.palette.primary.main }}
                  title="Fetch all hotels"
                >
                  <FindInPageIcon />
                </IconButton>
              )}
            </Paper>

            {isLoading && (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            )}

            {!isLoading && filteredHotels.length > 0 && (
              <Box p={4}>
                <Grid container spacing={3} justifyContent="center">
                  {filteredHotels.map((hotel) => (
                    <Grid
                      key={hotel.hotelId}
                      size={{
                        xs: 12,
                        sm: 10,
                        md: 6,
                        lg: 6,
                      }}
                    >
                      <SearchCard
                        hotel={hotel}
                        onViewDetails={handleViewDetails}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {!isLoading && filteredHotels.length === 0 && !isError && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="60vh"
                textAlign="center"
                color={theme.palette.text.secondary}
                px={2}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <SearchIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  No Hotels Found
                </Typography>
                <Typography>
                  We couldn't find any hotels matching your criteria. Try
                  adjusting your filters or search terms.
                </Typography>
              </Box>
            )}

            {isError && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="60vh"
                textAlign="center"
                color={theme.palette.error.main}
                px={2}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <ErrorOutlineIcon fontSize="large" color="error" />
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Something went wrong
                </Typography>
                <Typography>
                  Unable to fetch hotels. Please try again later.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
