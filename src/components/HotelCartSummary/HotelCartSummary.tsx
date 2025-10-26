import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { CartSummaryProps } from "@/types/HotelTypes";

const HotelCartSummary: React.FC<CartSummaryProps> = ({ cart, hotel }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box
      sx={{
        gridColumn: { lg: "span 1" },
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "12px",
      }}
    >
      <Card sx={{}}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingCartIcon />
              <Typography variant="h5" fontWeight={700}>
                Cart Summary
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cart.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.4, mb: 1 }} />
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                Your cart is empty
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  mt: 0.5,
                  fontWeight: 600,
                }}
              >
                Add rooms to get started
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    mb: 1.5,
                  }}
                >
                  {cart.length} {cart.length === 1 ? "Room" : "Rooms"} Added
                </Typography>

                {cart.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      bgcolor: "action.hover",
                      borderRadius: 1,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      fontWeight: 550,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Avatar
                        src={item.roomPhotoUrl}
                        alt={item.roomType}
                        variant="rounded"
                        sx={{ width: 80, height: 64, flexShrink: 0 }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.roomType}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                        >
                          Room #{item.roomNumber}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            fontSize: "0.75rem",
                            color: "text.secondary",
                            mt: 0.5,
                          }}
                        >
                          <span>{item.capacityOfAdults} Adults</span>
                          <span>•</span>
                          <span>{item.capacityOfChildren} Children</span>
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 1,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                      >
                        Price per night
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  border: `1px solid ${theme.palette.border.main}`,
                  pt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                  }}
                >
                  <Typography sx={{ color: "text.secondary", px: 2 }}>
                    Subtotal ({cart.length}{" "}
                    {cart.length === 1 ? "room" : "rooms"})
                  </Typography>
                  <Typography sx={{ fontWeight: 500, px: 2 }}>
                    ${totalPrice}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pt: 1,
                    px: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    Total per night
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    ${totalPrice}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          <Button
            variant="contained"
            size="large"
            disabled={cart.length === 0}
            sx={{ width: "100%", mt: 2 }}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  cart,
                  hotel: {
                    name: hotel.hotelName,
                    location: hotel.location,
                  },
                },
              })
            }
          >
            {cart.length === 0 ? "Add Rooms First" : "Proceed to Checkout"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotelCartSummary;
