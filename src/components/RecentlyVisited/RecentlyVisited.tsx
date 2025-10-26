import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useRecentlyVisited } from "@/hooks/useHomeQueries";
import HotelCard from "@/components/Cards/hotelCard/HotelCard";
import type { HotelPreview, RecentlyVisitedResponse } from "@/types/homeTypes";
import { useNavigate } from "react-router-dom";

const RecentlyVisited = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: recentlyVisited,
    isLoading: loadingVisited,
    isError: errorVisited,
  } = useRecentlyVisited();

  const isLoading = loadingVisited;
  const isError = errorVisited;

  if (isLoading) {
    return (
      <Typography
        variant="body1"
        textAlign="center"
        mt={4}
        color={theme.palette.text.secondary}
      >
        Loading home data...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" textAlign="center" color="error" mt={4}>
        Failed to load data. Please try again later.
      </Typography>
    );
  }

  const mappedRecentlyVisited: HotelPreview[] =
    recentlyVisited?.map((hotel: RecentlyVisitedResponse) => ({
      id: String(hotel.hotelId),
      name: hotel.hotelName,
      image: hotel.thumbnailUrl,
      location: hotel.cityName,
      rating: hotel.starRating,
      price: hotel.priceLowerBound,
      description: `Recently visited on ${new Date(
        hotel.visitDate
      ).toLocaleDateString()}`,
    })) ?? [];

  return (
    <Box bgcolor={theme.palette.background.default} p={"4rem 1rem"}>
      <Typography
        variant="h4"
        component="h2"
        color={theme.palette.text.primary}
        fontWeight={700}
        mb={3}
      >
        Recently Visited
      </Typography>

      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {mappedRecentlyVisited.map((hotel) => (
          <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HotelCard
              hotel={hotel}
              onViewDetails={(_id) => navigate(`/hotels/1`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentlyVisited;
