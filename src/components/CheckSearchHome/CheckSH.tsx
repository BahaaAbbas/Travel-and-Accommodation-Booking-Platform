import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PeopleIcon from "@mui/icons-material/People";

const CheckSH: React.FC = () => {
  const theme = useTheme();
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "light"
            ? "hsl(210, 20%, 94%)"
            : "hsl(220, 20%, 20%)",
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 600,
      color: theme.palette.text.secondary,
      transform: "translate(10px, 10px) scale(1)",
      "&.Mui-focused, &.MuiFormLabel-filled": {
        transform: "translate(10px, -7px) scale(0.8)",
        color: theme.palette.text.secondary,
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row", md: "row" }, // responsive
          gap: 1,
          alignItems: "center",
          mt: 3,
        }}
      >
        <Box
          sx={{
            ...dateFieldBox,
            width: { xs: "200px", sm: "200px", md: "250px" },
          }}
        >
          <DatePicker
            label="Check-in"
            value={checkIn}
            onChange={(newValue) => setCheckIn(newValue)}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            ...dateFieldBox,
            width: { xs: "200px", sm: "200px", md: "250px" },
          }}
        >
          <DatePicker
            label="Check-out"
            value={checkOut}
            onChange={(newValue) => setCheckOut(newValue)}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PeopleIcon />}
          onClick={handleClick}
          sx={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontWeight: 600,
            border: `1px solid ${theme.palette.divider}`,
            height: 40,
            minHeight: "48px",
            py: 0,
            borderRadius: 1.5,
            "&:hover": {
              background:
                theme.palette.mode === "light"
                  ? "hsl(210, 20%, 94%)"
                  : "hsl(220, 20%, 20%)",
            },
          }}
        >
          {`${adults} Adults, ${children} Children, ${rooms} Room${
            rooms > 1 ? "s" : ""
          }`}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              padding: "12px 32px",
              borderRadius: 2,
              "& .MuiMenuItem-root": {
                fontWeight: 600,
                borderRadius: 1,
                transition: "background 0.2s ease, color 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                },
              },
            },
          }}
        >
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
  );
};

export default CheckSH;
