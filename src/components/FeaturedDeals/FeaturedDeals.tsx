import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useFeaturedDeals } from "@/hooks/useHomeQueries";
import HotelCard from "@/components/Cards/hotelCard/HotelCard";
import type { FeaturedDealResponse, Hotel } from "@/types/homeTypes";

const FeaturedDeals = () => {
  const theme = useTheme();

  const {
    data: featuredDeals,
    isLoading: loadingDeals,
    isError: errorDeals,
  } = useFeaturedDeals();

  const isLoading = loadingDeals;
  const isError = errorDeals;

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

  const mappedFeaturedDeals: Hotel[] =
    featuredDeals?.map((deal: FeaturedDealResponse) => ({
      id: String(deal.hotelId),
      name: deal.hotelName,
      image: deal.roomPhotoUrl,
      location: deal.cityName,
      rating: deal.hotelStarRating,
      price: deal.finalPrice,
      description: deal.description,
      discount: deal.discount,
    })) ?? [];

  return (
    <Box mt={4} bgcolor={theme.palette.background.paper} p={"4rem 1rem"}>
      <Typography
        variant="h4"
        component="h1"
        color={theme.palette.text.primary}
        fontWeight={700}
        mb={3}
      >
        Featured Deals
      </Typography>

      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {mappedFeaturedDeals.map((hotel) => (
          <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HotelCard
              hotel={hotel}
              onViewDetails={() => console.log(hotel.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedDeals;
