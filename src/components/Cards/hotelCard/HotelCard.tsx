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
import type { HotelCardProps } from "@/types/homeTypes";
import AppButton from "@/components/Buttons/AppButton";

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onViewDetails }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
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
          }}
        />
      )}

      <CardMedia
        component="img"
        height="200"
        image={hotel.image}
        alt={hotel.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          color={theme.palette.text.primary}
        >
          {hotel.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            noWrap
          >
            {hotel.location}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <Rating value={hotel.rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" ml={0.5} color="text.secondary">
            ({hotel.rating})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {hotel.description}
        </Typography>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700} color="primary">
            ${hotel.price}
            <Typography component="span" variant="body2" color="text.secondary">
              {" "}
              / night
            </Typography>
          </Typography>

          <AppButton
            text="View Details"
            padding="8px 16px"
            bgColor={(theme) => theme.palette.primary.main}
            onClick={() => onViewDetails?.(hotel.id)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
