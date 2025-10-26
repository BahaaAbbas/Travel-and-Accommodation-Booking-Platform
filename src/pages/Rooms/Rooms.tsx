import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { addItem } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  Stack,
  Paper,
  Chip,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { type AlertColor } from "@mui/material/Alert";
import { useQuery } from "@tanstack/react-query";
import searchService from "@/services/searchService";

import { selectCartItems } from "@/features/cart/cartSelectors";
import type { Room } from "@/types/HotelTypes";

const Rooms = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });

  const handleSnackbarClose = () => setSnackbar((s) => ({ ...s, open: false }));

  const isInCart = (roomId: number) =>
    cartItems.some((item) => item.roomId === roomId);

  const {
    data: rooms,
    isLoading: roomsLoading,
    isError: roomsError,
  } = useQuery<Room[]>({
    queryKey: ["getRooms"],
    queryFn: searchService.getRooms,
  });

  if (roomsLoading) {
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

  if (roomsError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load rooms. Please try again later.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        pt: 5,
        px: { xs: 1, sm: 2, md: 4, lg: 2 },
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        transition: "background 0.4s",
        pb: 4,
        overflowX: "unset",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg,#76aaff,#00b2d6)"
                : "linear-gradient(90deg,#156aff,#01e7f3)",
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          All Rooms
        </Typography>
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={() => navigate("/search")}
          sx={{
            fontWeight: 600,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          }}
        >
          Want to search more?
        </Button>
      </Box>

      {rooms && rooms.length > 0 ? (
        <Grid container spacing={3}>
          {rooms.map((room) => {
            const roomIsInCart = isInCart(room.roomId);
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.roomId}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    bgcolor: theme.palette.background.paper,
                    boxShadow: theme.shadows[2],
                    overflow: "hidden",
                    transition: "box-shadow .2s, transform .22s",
                    "&:hover": {
                      boxShadow: theme.shadows[8],
                      transform: "translateY(-2px) scale(1.01)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    src={room.roomPhotoUrl}
                    alt={room.roomType}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      background:
                        theme.palette.mode === "dark" ? "#22243a" : "#f9fbfa",
                    }}
                  />
                  <Box
                    sx={{
                      p: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {room.roomType}
                      </Typography>
                      <Chip
                        label={room.availability ? "Available" : "Unavailable"}
                        color={room.availability ? "primary" : "default"}
                        size="small"
                        sx={{
                          backgroundColor: room.availability
                            ? "#1976d2"
                            : "#8b8787",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mb: 2 }}
                    >
                      Room #{room.roomId} • Adults: {room.capacityOfAdults} •
                      Children: {room.capacityOfChildren}
                    </Typography>

                    {room.roomAmenities && room.roomAmenities.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        mb={2}
                        sx={{ flexWrap: "wrap" }}
                      >
                        {room.roomAmenities.map((amenity, idx) => (
                          <Chip
                            key={amenity.id}
                            label={amenity.name}
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              borderRadius: 2,
                              px: 1,
                              background:
                                theme.palette.mode === "dark"
                                  ? [
                                      theme.palette.primary.main,
                                      theme.palette.accent.main,
                                      theme.palette.secondary.main,
                                    ][idx % 3]
                                  : [
                                      theme.palette.accent.main,
                                      theme.palette.secondary.main,
                                      theme.palette.primary.main,
                                    ][idx % 3],
                              color:
                                theme.palette.mode === "dark"
                                  ? "white"
                                  : theme.palette.text.primary,
                              boxShadow: theme.shadows[1],
                              letterSpacing: 0.1,
                              transition: "background .2s",
                            }}
                          />
                        ))}
                      </Stack>
                    )}

                    <Box sx={{ mt: "auto" }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          mb: 2,
                        }}
                      >
                        ${room.price}
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "1rem",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          /night
                        </Typography>
                      </Typography>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          startIcon={<ShoppingCartIcon />}
                          size="small"
                          disabled={!room.availability || roomIsInCart}
                          sx={{
                            flex: 1,
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            borderColor: "#979393",
                            "&:hover": {
                              borderColor: "#888",
                              backgroundColor:
                                theme.palette.accent?.main || "#f0f0f0",
                            },
                          }}
                          onClick={() => {
                            if (roomIsInCart) {
                              setSnackbar({
                                open: true,
                                message: "Room already in cart!",
                                severity: "info",
                              });
                            } else {
                              dispatch(addItem(room));
                              setSnackbar({
                                open: true,
                                message: "Added to cart successfully!",
                                severity: "success",
                              });
                            }
                          }}
                        >
                          {roomIsInCart ? "In Cart" : "Add to Cart"}
                        </Button>

                        <Button
                          variant="contained"
                          size="small"
                          disabled={!room.availability}
                          sx={{
                            flex: 1,
                            backgroundColor: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: "#7070bb",
                            },
                          }}
                          onClick={() => {
                            if (!roomIsInCart) {
                              dispatch(addItem(room));
                              setSnackbar({
                                open: true,
                                message:
                                  "Added to cart successfully! Proceeding to checkout...",
                                severity: "success",
                              });
                            } else {
                              setSnackbar({
                                open: true,
                                message:
                                  "Room already in cart! Proceeding to checkout...",
                                severity: "info",
                              });
                            }
                            navigate("/checkout", {
                              state: { bookNow: true, room },
                            });
                          }}
                        >
                          Book Now
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Paper
          sx={{
            maxWidth: 500,
            mx: "auto",
            p: 6,
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
          }}
        >
          <Typography variant="h6" color="text.secondary" fontWeight={700}>
            No rooms available
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Check back later for available rooms.
          </Typography>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1800}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={12}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ fontWeight: 600, letterSpacing: 0.2 }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Rooms;
