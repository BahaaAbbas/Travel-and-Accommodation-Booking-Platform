import AboutHotel from "@/components/AboutHotel";
import AvailableRooms from "@/components/AvailableRooms";

import HotelMap from "@/components/HotelMap";
import HotelSlider from "@/components/HotelSlider";
import hotelService from "@/services/hotelService";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const Hotels = () => {
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
    data: rooms,
    isLoading: roomsLoading,
    isError: roomsError,
  } = useQuery({
    queryKey: ["availableRooms"],
    queryFn: hotelService.getAvailableRooms,
  });

  const {
    data: gallery,
    isLoading: galleryLoading,
    isError: galleryError,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: hotelService.getHotelGallery,
  });

  if (hotelsLoading || roomsLoading || galleryLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (hotelsError || roomsError || galleryError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load hotel data. Please try again later.
      </Typography>
    );
  }

  const hotel = hotels?.[0];
  const images = gallery?.map((img) => img.url) || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        pt: "2rem",
        px: "1rem",
        mb: "2rem",
        gap: 4,
        bgcolor: theme.palette.background.default,
      }}
    >
      <HotelSlider images={images} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <AboutHotel />
            <HotelMap
              center={{
                lat: hotel?.latitude || -8.3405,
                lng: hotel?.longitude || 115.0915,
              }}
              hotelName={hotel?.hotelName || "Hotel Location"}
            />
            {/* <AvailableRooms /> */}
            <AvailableRooms rooms={rooms || []} isLoading={roomsLoading} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hotels;
