import React from "react";
import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/features/search/searchSlice";
import { selectFilters } from "@/features/search/searchSelector";
import type { Filters } from "@/features/types";
import { useQuery } from "@tanstack/react-query";
import searchService from "@/services/searchService";
import type { Amenity, Room } from "@/types/HotelTypes";

const SearchFilter: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const { data: rooms, isLoading: roomsLoading } = useQuery<Room[], Error>({
    queryKey: ["rooms"],
    queryFn: searchService.getRooms,
  });

  const { data: amenities, isLoading: amenitiesLoading } = useQuery<
    Amenity[],
    Error
  >({
    queryKey: ["amenities"],
    queryFn: searchService.getAmenities,
  });

  const roomTypesList = rooms ? [...new Set(rooms.map((r) => r.roomType))] : [];
  const amenitiesList = amenities ? amenities.map((a) => a.name) : [];

  const filterBoxStyle = {
    p: 2,
    borderRadius: 2,
    bgcolor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    dispatch(
      setFilters({ ...filters, priceRange: newValue as [number, number] })
    );
  };

  const handleToggle = (
    value: string,
    key: keyof Omit<Filters, "priceRange">
  ) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    dispatch(setFilters({ ...filters, [key]: updated }));
  };

  if (roomsLoading || amenitiesLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 2 }}>
      {/* PRICE RANGE */}
      <Paper sx={filterBoxStyle}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange || [0, 1000]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={50}
          sx={{ color: theme.palette.primary.main, mt: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: theme.palette.text.secondary,
            mt: 0.5,
          }}
        >
          <span>${filters.priceRange?.[0] || 0}</span>
          <span>${filters.priceRange?.[1] || 1000}</span>
        </Box>
      </Paper>

      {/* STAR RATING */}
      <Paper sx={filterBoxStyle}>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Star Rating
          </Typography>
          <FormGroup>
            {[5, 4, 3].map((star) => (
              <FormControlLabel
                key={star}
                control={
                  <Checkbox
                    checked={
                      filters.selectedStars?.includes(String(star)) || false
                    }
                    onChange={() => handleToggle(String(star), "selectedStars")}
                  />
                }
                label={`${star} Stars`}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Paper>

      {/* AMENITIES */}
      <Paper sx={{ ...filterBoxStyle, overflowY: "auto" }}>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Amenities
          </Typography>
          <FormGroup>
            {amenitiesList.map((amenity) => (
              <FormControlLabel
                key={amenity}
                control={
                  <Checkbox
                    checked={
                      filters.selectedAmenities?.includes(amenity) || false
                    }
                    onChange={() => handleToggle(amenity, "selectedAmenities")}
                  />
                }
                label={amenity}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Paper>

      {/* ROOM TYPE */}
      <Paper sx={{ ...filterBoxStyle, overflowY: "auto" }}>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Room Type
          </Typography>
          <FormGroup>
            {roomTypesList.map((roomType) => (
              <FormControlLabel
                key={roomType}
                control={
                  <Checkbox
                    checked={
                      filters.selectedRoomTypes?.includes(roomType) || false
                    }
                    onChange={() => handleToggle(roomType, "selectedRoomTypes")}
                  />
                }
                label={roomType}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default SearchFilter;
