import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppButton from "@/components/Buttons/AppButton";
import type { SearchCardProps } from "@/types/search";

const SearchCard: React.FC<SearchCardProps> = ({ hotel, onViewDetails }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[12],
        },
      }}
    >
      {/* Discount Badge */}
      {hotel.discount && (
        <Chip
          label={`-${hotel.discount}%`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: 600,
            borderRadius: "12px",
          }}
        />
      )}

      {/* Hotel Image */}
      <CardMedia
        component="img"
        height="200"
        image={hotel.roomPhotoUrl}
        alt={hotel.hotelName}
        sx={{
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          color={theme.palette.text.primary}
        >
          {hotel.hotelName}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            noWrap
          >
            {hotel.cityName}
          </Typography>
        </Box>

        {/* Rating */}
        <Box display="flex" alignItems="center" mb={1}>
          <Rating
            value={hotel.starRating}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="body2" ml={0.5} color="text.secondary">
            ({hotel.starRating})
          </Typography>
        </Box>

        {/* Room Type */}
        {hotel.roomType && (
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
            sx={{ mb: 1 }}
          >
            {hotel.roomType}
          </Typography>
        )}

        {/* Amenities */}
        {hotel.amenities && (
          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            {hotel.amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                size="small"
                sx={{
                  fontWeight: 500,
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.primary.main + "20"
                      : theme.palette.accent.main,
                  color:
                    index % 2 === 0
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                }}
              />
            ))}
          </Box>
        )}

        {/* Price and Button */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700} color="primary">
            ${hotel.roomPrice}
            <Typography component="span" variant="body2" color="text.secondary">
              {" "}
              / night
            </Typography>
          </Typography>

          <AppButton
            text="View Details"
            padding="8px 16px"
            bgColor={(theme) => theme.palette.primary.main}
            onClick={() => onViewDetails?.(hotel.hotelId)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
