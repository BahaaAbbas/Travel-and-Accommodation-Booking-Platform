import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PeopleIcon from "@mui/icons-material/People";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AppButton from "../Buttons/AppButton";

import { useSearchQueries } from "@/hooks/useSearchQueries";
import { useDebounce } from "@/hooks/useDebounce";
import type { SearchParams } from "@/types/search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchWithCheckProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (params: SearchParams) => void;
}

const SearchWithCheck: React.FC<SearchWithCheckProps> = ({
  searchText,
  setSearchText,
  onSearch,
}) => {
  const theme = useTheme();
  const { searchHotels } = useSearchQueries();

  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const debouncedSearch = useDebounce(searchText, 600);
  const lastSearchedRef = useRef<string>("");

  useEffect(() => {
    if (
      debouncedSearch.trim() !== "" &&
      debouncedSearch.trim() !== lastSearchedRef.current
    ) {
      lastSearchedRef.current = debouncedSearch.trim();

      searchHotels({ query: debouncedSearch.trim() });
    }
  }, [debouncedSearch, searchHotels]);

  const handleSearchClick = () => {
    const params: SearchParams = {
      query: searchText.trim(),
      checkInDate: checkIn?.format("YYYY-MM-DD"),
      checkOutDate: checkOut?.format("YYYY-MM-DD"),
      adults,
      children,
      numberOfRooms: rooms,
    };

    if (onSearch) {
      onSearch(params);
      searchHotels(params);
    } else {
      lastSearchedRef.current = searchText.trim();
      searchHotels(params);
    }
  };

  const handleGuestClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleGuestClose = () => setAnchorEl(null);

  const dateFieldBox = {
    bgcolor: theme.palette.background.paper,
    borderRadius: 1.5,
    border: `1px solid ${theme.palette.divider}`,
    p: 0.5,
    "& .MuiInputBase-root": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 1,
      fontWeight: 600,
      height: 40,
      "& input": {
        fontWeight: 600,
        color: theme.palette.text.primary,
        padding: "8px 12px",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mb: 3,
        p: 2,
        borderRadius: 2,
        boxSizing: "border-box",
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: "12px",
            boxShadow: 2,
            overflow: "hidden",
            width: "100%",
            maxWidth: { xs: "300px", sm: "500px", md: "600px" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for hotels, cities..."
            variant="outlined"
            size="medium"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    color="action"
                    sx={{ color: theme.palette.text.secondary }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchText ? (
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                      color: theme.palette.text.secondary,
                    }}
                    onClick={() => {
                      setSearchText("");
                      searchHotels({ query: "" });
                    }}
                  />
                </InputAdornment>
              ) : null,
              sx: { height: "44px" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                "& fieldset": { border: "none" },
              },
              backgroundColor: theme.palette.background.default,
            }}
          />
        </Box>

        <AppButton
          text="Search"
          bgColor={(theme) => theme.palette.success.main}
          onClick={handleSearchClick}
        />
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            alignItems: "center",
            mt: 3,
          }}
        >
          <Box sx={{ ...dateFieldBox, width: { xs: "200px", md: "250px" } }}>
            <DatePicker
              label="Check-in"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Box>

          <Box sx={{ ...dateFieldBox, width: { xs: "200px", md: "250px" } }}>
            <DatePicker
              label="Check-out"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PeopleIcon />}
            onClick={handleGuestClick}
            sx={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontWeight: 600,
              border: `1px solid ${theme.palette.divider}`,
              height: 40,
              borderRadius: 1.5,
            }}
          >
            {`${adults} Adults, ${children} Children, ${rooms} Room${
              rooms > 1 ? "s" : ""
            }`}
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleGuestClose}>
            {[
              { label: "Adults", value: adults, set: setAdults, min: 1 },
              { label: "Children", value: children, set: setChildren, min: 0 },
              { label: "Rooms", value: rooms, set: setRooms, min: 1 },
            ].map(({ label, value, set, min }) => (
              <MenuItem key={label} sx={{ justifyContent: "space-between" }}>
                <Typography flexGrow={1} fontWeight={600}>
                  {label}
                </Typography>
                <Box display="flex" alignItems="center" px={5}>
                  <IconButton
                    onClick={() => set(Math.max(min, value - 1))}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography mx={1} fontWeight={600}>
                    {value}
                  </Typography>
                  <IconButton onClick={() => set(value + 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default SearchWithCheck;
