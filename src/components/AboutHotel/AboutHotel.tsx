import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useQuery } from "@tanstack/react-query";
import hotelService from "@/services/hotelService";

const AboutHotel: React.FC = () => {
  const theme = useTheme();
  const {
    data: hotels,
    isLoading: hotelsLoading,
    isError: hotelsError,
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: hotelService.getHotelDetails,
  });

  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: hotelService.getHotelReviews,
  });

  if (hotelsLoading || reviewsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (hotelsError || reviewsError) {
    return (
      <Typography color="error" textAlign="center" mt={2}>
        Failed to load hotel information. Please try again later.
      </Typography>
    );
  }

  const hotel = hotels?.[0];
  const hotelName = hotel?.hotelName || "Hotel";
  const location = hotel?.location || "";
  const stars = hotel?.starRating || 0;
  const aboutText = hotel?.description || "";
  const amenities = hotel?.amenities || [];
  const hotelReviews = reviews || [];
  return (
    <Box
      sx={{
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight="bold">
          {hotelName}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Rating value={stars} readOnly precision={0.5} size="medium" />
          <Chip
            icon={
              <LocationOnIcon
                fontSize="small"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              />
            }
            label={location}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
            }}
          />
        </Stack>
      </Box>

      <Card
        sx={{
          mb: 3,
          border: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <CardHeader
          title="About This Hotel"
          sx={{ pb: 0 }}
          titleTypographyProps={{
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        />

        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {aboutText}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 3,

          border: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <CardHeader
          title="Amenities"
          sx={{ pb: 0 }}
          titleTypographyProps={{
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {amenities.map((item, index) => (
              <Grid key={index}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {item.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card
        sx={{
          border: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <CardHeader
          title="Guest Reviews"
          sx={{ pb: 0 }}
          titleTypographyProps={{
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        />
        <CardContent>
          <Stack spacing={2}>
            {hotelReviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,

                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={1}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.customerName}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating
                      value={review.rating}
                      readOnly
                      precision={0.1}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {review.rating}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {review.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutHotel;
