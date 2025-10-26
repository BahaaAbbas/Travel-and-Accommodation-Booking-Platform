import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { removeItem, clearCart } from "@/features/cart/cartSlice";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "@/features/cart/cartSelectors";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [openClear, setOpenClear] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (roomId: number) => {
    dispatch(removeItem(roomId));
  };

  const handleClear = () => setOpenClear(true);
  const handleConfirmClear = () => {
    dispatch(clearCart());
    setOpenClear(false);
  };
  const handleCancelClear = () => setOpenClear(false);

  return (
    <Box
      sx={{
        pt: 5,
        px: { xs: 4, sm: 6, md: 12 },
        width: "100%",
        maxWidth: 1000,
        minHeight: "100vh",
        mx: "auto",
        bgcolor: theme.palette.background.default,
        transition: "background 0.4s",
        pb: 4,
        overflowX: "unset",
        boxSizing: "border-box",
        mb: { xs: 16 },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={800}
        mb={4}
        textAlign={{ xs: "center", md: "left" }}
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
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Paper
          sx={{
            maxWidth: 500,
            width: "100%",
            mx: "auto",
            p: { xs: 3, sm: 5, md: 6 },
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #172a42 67%, #273e5c 100%)"
                : "linear-gradient(135deg, #fff 55%, #e5f6ff 100%)",
            overflow: "hidden",
          }}
        >
          <ShoppingCartIcon
            sx={{
              fontSize: 80,
              color: theme.palette.primary.light,
              mb: 2,
              opacity: 0.7,
            }}
          />
          <Typography variant="h6" color="text.secondary" fontWeight={700}>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Add some rooms to begin your booking!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/rooms")}
          >
            Browse Hotel's Rooms
          </Button>
        </Paper>
      ) : (
        <Box width="100%" maxWidth={1000} mx="auto" px={{ xs: 0, sm: 1 }}>
          {" "}
          <Stack gap={{ xs: 2, sm: 3 }} width="100%">
            {cartItems.map((item) => (
              <Card
                key={item.roomId}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  px: { xs: 1, md: 3 },
                  py: { xs: 2, md: 3 },
                  mb: 1,
                  position: "relative",
                  transition: "box-shadow .2s, transform .22s",
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-2px) scale(1.01)",
                  },
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  src={item.roomPhotoUrl}
                  alt={item.roomType}
                  sx={{
                    width: { xs: "100%", sm: 120 },
                    height: { xs: 170, sm: 90 },
                    borderRadius: 2,
                    objectFit: "cover",
                    mb: { xs: 1.5, sm: 0 },
                    mr: { xs: 0, sm: 3 },
                    boxShadow: theme.shadows[1],
                    background:
                      theme.palette.mode === "dark" ? "#22243a" : "#f9fbfa",
                    transition: "width .25s, height .25s",
                  }}
                />
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Typography
                    fontWeight={700}
                    fontSize="1.09rem"
                    color="text.primary"
                    noWrap
                  >
                    {item.roomType}{" "}
                    <Typography component="span" color="text.secondary">
                      #{item.roomNumber}
                    </Typography>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontWeight={500}
                    fontSize="0.96rem"
                  >
                    {item.capacityOfAdults} Adults · {item.capacityOfChildren}{" "}
                    Children
                  </Typography>
                  <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                    mt={1}
                    sx={{ flexWrap: "wrap" }}
                  >
                    <Typography
                      color="primary"
                      fontWeight={700}
                      fontSize={{ xs: "1.05rem", sm: "1.3rem" }}
                    >
                      ${item.price}
                      <Typography
                        component="span"
                        color="text.secondary"
                        fontSize="1rem"
                      >
                        /night
                      </Typography>
                    </Typography>
                  </Stack>
                </Box>
                <IconButton
                  sx={{
                    ml: { xs: 0, sm: 2 },
                    color: theme.palette.error.main,
                    transition: "color .2s",
                    alignSelf: { xs: "flex-end", sm: "center" },
                    mt: { xs: 1.5, sm: 0 },
                  }}
                  onClick={() => handleRemove(item.roomId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {cartItems.length > 0 && (
        <Paper
          elevation={8}
          sx={{
            position: { xs: "fixed", md: "sticky" },
            bottom: { xs: 0, md: 30 },
            left: 0,
            width: "100%",
            maxWidth: 1000,
            mx: "auto",
            mt: 6,
            p: { xs: 2, sm: 4 },
            borderRadius: { xs: 0, md: 4 },
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            boxShadow: theme.shadows[12],
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.card.main
                : theme.palette.background.paper,
            zIndex: 100,
            gap: 2,
            overflowX: "unset",
            borderTop: { xs: `2px solid ${theme.palette.divider}`, md: "none" },
          }}
        >
          <Box>
            <Typography fontWeight={800} fontSize="1.2rem">
              Total:{" "}
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 800 }}
              >
                ${totalPrice}
              </span>
            </Typography>
            <Typography
              color="text.secondary"
              fontSize="0.96rem"
              fontWeight={600}
            >
              ({cartItems.length} room{cartItems.length > 1 ? "s" : ""} in cart)
            </Typography>
          </Box>
          <Stack direction={{ xs: "row", sm: "row" }} gap={2}>
            <Button
              color="error"
              variant="outlined"
              onClick={handleClear}
              disabled={cartItems.length === 0}
              sx={{ fontWeight: 700 }}
            >
              Clear Cart
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{
                fontWeight: 800,
                letterSpacing: 0.2,
                mr: { sm: 8, xs: 4, md: 0, lg: 0 },
              }}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </Paper>
      )}

      <Dialog
        open={openClear}
        onClose={handleCancelClear}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: { xs: 280, sm: 400 },
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Clear Cart?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Are you sure you want to clear all items from your cart? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={handleCancelClear}
            variant="outlined"
            sx={{
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              color: "text.primary",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmClear}
            color="error"
            variant="contained"
            sx={{
              px: 3,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
