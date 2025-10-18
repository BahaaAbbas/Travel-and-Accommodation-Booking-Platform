import { Box, Grid, Typography, useTheme } from "@mui/material";

import TrendingCard from "../Cards/TrendingCard";
import { useTrendingDestinations } from "@/hooks/useHomeQueries";

const TrendingDestinations = () => {
  const theme = useTheme();

  const {
    data: trendingDestinations,
    isLoading: loadingTrending,
    isError: errorTrending,
  } = useTrendingDestinations();

  const isLoading = loadingTrending;
  const isError = errorTrending;

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

  return (
    <Box bgcolor={theme.palette.background.paper} p={"4rem 1rem"}>
      <Typography variant="h4" component="h2" fontWeight={700} mb={3}>
        Trending Destinations
      </Typography>

      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {trendingDestinations?.map((dest) => (
          <Grid key={dest.cityId} size={{ xs: 12, sm: 6, md: 4 }}>
            <TrendingCard
              city={dest.cityName}
              country={dest.countryName}
              imageUrl={dest.thumbnailUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingDestinations;
