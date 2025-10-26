import { Box, Grid, Typography, useTheme } from "@mui/material";

import { useTrendingDestinations } from "@/hooks/useHomeQueries";
import TrendingCard from "@/components/Cards/trendingCard/TrendingCard";
import { useNavigate } from "react-router-dom";

const TrendingDestinations = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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

      <Grid container spacing={3} justifyContent="center">
        {trendingDestinations?.map((dest) => (
          <Grid key={dest.cityId} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              onClick={() => navigate(`/destination/${dest.cityId}`)}
              sx={{ cursor: "pointer" }}
            >
              <TrendingCard
                city={dest.cityName}
                country={dest.countryName}
                imageUrl={dest.thumbnailUrl}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingDestinations;
