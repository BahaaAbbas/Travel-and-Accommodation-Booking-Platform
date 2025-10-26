import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  CardMedia,
  Stack,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { addItem } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { type AlertColor } from "@mui/material/Alert";
import { selectCartItems } from "@/features/cart/cartSelectors";
import type { AvailableRoomsProps } from "@/types/HotelTypes";

const AvailableRooms: React.FC<AvailableRoomsProps> = ({
  rooms,
  isLoading,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCartItems);

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });
  const handleSnackbarClose = () => setSnackbar((s) => ({ ...s, open: false }));

  const isInCart = (roomId: number) =>
    cartItems.some((item) => item.roomId === roomId);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 3,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.border.main}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 700,
          borderBottom: `1px solid ${theme.palette.border.main}`,
        }}
      >
        Available Rooms
      </Typography>

      <Stack spacing={2}>
        {rooms.map((room) => {
          const roomIsInCart = isInCart(room.roomId);
          return (
            <Card
              key={room.roomId}
              sx={{
                display: "flex",
                alignItems: "stretch",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "action.hover",
              }}
            >
              <CardMedia
                component="img"
                image={room.roomPhotoUrl}
                alt={room.roomType}
                sx={{
                  width: 200,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 2,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              />
              <CardContent
                sx={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                      fontWeight: 550,
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  Room #{room.roomId} • Adults: {room.capacityOfAdults} •
                  Children: {room.capacityOfChildren}
                </Typography>

                {room.roomAmenities && room.roomAmenities.length > 0 && (
                  <Stack direction="row" spacing={1} mb={2}>
                    {room.roomAmenities.map((amenity, idx) => (
                      <Chip
                        key={amenity.id}
                        label={amenity.name}
                        size="small"
                        sx={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          px: 1.1,
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
                              : theme.palette.primary.contrastText,
                          boxShadow: theme.shadows[1],
                          letterSpacing: 0.1,
                          transition: "background .2s",
                          ":hover": {
                            background:
                              theme.palette.mode === "dark"
                                ? theme.palette.secondary.dark
                                : theme.palette.secondary.light,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
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
                        color: theme.palette.text.primary,
                        fontWeight: 550,
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
              </CardContent>
            </Card>
          );
        })}

        {rooms.length === 0 && (
          <Typography color="text.secondary" textAlign="center">
            No rooms available at the moment.
          </Typography>
        )}
      </Stack>
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

export default AvailableRooms;
