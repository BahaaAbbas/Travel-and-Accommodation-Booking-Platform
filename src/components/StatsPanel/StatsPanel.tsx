import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Skeleton,
  Grid,
  LinearProgress,
} from "@mui/material";
import { TrendingUp, Star, Map, Bed, Group } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import adminService from "@/services/adminService";

import type { Stats } from "@/types/statsTypes";

const StatsPanel = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: adminService.getStats,
  });

  if (isLoading)
    return <Skeleton variant="rectangular" width="100%" height={400} />;

  if (isError || !data)
    return (
      <Typography color="error.main">Failed to load statistics.</Typography>
    );
  const {
    overview,
    topCitiesByHotels,
    hotelStarDistribution,
    roomAvailability,
  } = data;
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} mb={3} alignItems={"stretch"}>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Card sx={{ bgcolor: theme.palette.primary.light, height: "100%" }}>
            <CardHeader
              avatar={<Map color="primary" />}
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Total Cities
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight={600}>
                {overview.totalCities}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
              >
                Across {overview.totalCountries} countries
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Card sx={{ bgcolor: theme.palette.info.light, height: "100%" }}>
            <CardHeader
              avatar={<Bed sx={{ color: theme.palette.info.main }} />}
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Total Hotels
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight={600}>
                {overview.totalHotelsAcrossCities}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
              >
                {overview.totalRegisteredHotels} registered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Card sx={{ bgcolor: theme.palette.success.light, height: "100%" }}>
            <CardHeader
              avatar={<Group sx={{ color: theme.palette.success.main }} />}
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Total Rooms
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight={600}>
                {overview.totalRooms}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
              >
                {overview.availableRooms} available
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Card sx={{ bgcolor: theme.palette.warning.light, height: "100%" }}>
            <CardHeader
              avatar={<Group sx={{ color: theme.palette.warning.main }} />}
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Avg Capacity
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight={600}>
                {overview.averageCapacityPerRoom.toFixed(1)}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
              >
                Per Room
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              avatar={<TrendingUp color="primary" />}
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Top Cities by Hotels
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                {topCitiesByHotels.map(
                  (city: (typeof topCitiesByHotels)[number]) => (
                    <Box key={city.cityName}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">{city.cityName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {city.hotelCount} hotels
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={city.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  )
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              avatar={
                <Star
                  fontSize="small"
                  sx={{ color: theme.palette.warning.main }}
                />
              }
              title={
                <Typography variant="subtitle2" fontWeight={700}>
                  Hotel Star Ratings
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                {hotelStarDistribution
                  .sort(
                    (
                      a: (typeof hotelStarDistribution)[number],
                      b: (typeof hotelStarDistribution)[number]
                    ) => b.starRating - a.starRating
                  )
                  .map((rating: (typeof hotelStarDistribution)[number]) => (
                    <Box key={rating.starRating}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">
                          {rating.starRating} Star
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rating.count} hotels
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={rating.percentage}
                        color="warning"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader
          title={
            <Typography variant="subtitle2" fontWeight={700}>
              Room Availability Overview
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Available Rooms
              </Typography>
              <Typography variant="h5" color="success.main">
                {roomAvailability.available}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Unavailable Rooms
              </Typography>
              <Typography variant="h5" color="error.main">
                {roomAvailability.unavailable}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Occupancy Rate
              </Typography>
              <Typography variant="h5">
                {roomAvailability.occupancyRate.toFixed(1)}%
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <LinearProgress
              variant="determinate"
              value={roomAvailability.occupancyRate}
              sx={{
                height: 12,
                borderRadius: 12,
                background:
                  theme.palette.grey[theme.palette.mode === "dark" ? 800 : 300],
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatsPanel;
