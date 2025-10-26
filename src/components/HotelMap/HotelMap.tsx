import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import type { HotelMapProps } from "@/types/HotelTypes";

const defaultCenter = {
  lat: -8.3405,
  lng: 115.0915,
};

const HotelMap: React.FC<HotelMapProps> = ({
  center = defaultCenter,
  zoom = 15,
  hotelName = "Hotel Location",
}) => {
  const theme = useTheme();

  const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  const maptilerStyleUrl =
    theme.palette.mode === "dark"
      ? `https://api.maptiler.com/maps/darkmatter/style.json?key=${maptilerApiKey}`
      : `https://api.maptiler.com/maps/streets/style.json?key=${maptilerApiKey}`;

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <CardHeader
        title="Location"
        sx={{ pb: 0 }}
        titleTypographyProps={{
          fontWeight: 700,
          fontSize: "1.5rem",
        }}
      />

      <CardContent>
        <Box
          sx={{
            position: "relative",
            height: 400,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Map
            mapLib={maplibregl}
            mapStyle={maptilerStyleUrl}
            initialViewState={{
              latitude: center.lat,
              longitude: center.lng,
              zoom: zoom,
            }}
            style={{ width: "100%", height: "100%" }}
            attributionControl={false}
            reuseMaps
          >
            <Marker
              longitude={center.lng}
              latitude={center.lat + 0.008}
              anchor="center"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 48,
                    transform: "translateY(-4px)",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    px: 0.8,
                    py: 0.2,
                    borderRadius: 1,
                    mt: 0.3,
                    fontWeight: 500,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {hotelName}
                </Typography>
              </Box>
            </Marker>

            <NavigationControl position="bottom-right" />
          </Map>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelMap;
