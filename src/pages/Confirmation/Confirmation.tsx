import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  Stack,
  Grid,
  Card,
  CardMedia,
  Chip,
  useTheme,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppSelector } from "@/features/hooks";
import { selectCartItems } from "@/features/cart/cartSelectors";
import type { Room } from "@/types/HotelTypes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generateConfirmationNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 10 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

interface HotelGroup {
  hotelName: string;
  hotelLocation?: string;
  rooms: Room[];
}

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmInfo } = location.state || {};
  const cart = useAppSelector(selectCartItems);
  const theme = useTheme();

  useEffect(() => {
    if (!confirmInfo || cart.length === 0) {
      navigate("/home", { replace: true });
    }
  }, [confirmInfo, cart, navigate]);

  const confirmationNumber = useMemo(generateConfirmationNumber, []);

  const totalCost = useMemo(
    () => cart.reduce((sum, room) => sum + room.price, 0),
    [cart]
  );

  const groupedHotels = useMemo(() => {
    const groups: HotelGroup[] = [];
    const hotelMap = new Map<string, Room[]>();

    cart.forEach((room) => {
      const hotelKey = room.hotelName || "Other Hotels";
      if (!hotelMap.has(hotelKey)) {
        hotelMap.set(hotelKey, []);
      }
      hotelMap.get(hotelKey)!.push(room);
    });

    hotelMap.forEach((rooms, hotelName) => {
      groups.push({
        hotelName,
        hotelLocation: rooms[0]?.hotelLocation || "",
        rooms,
      });
    });

    return groups;
  }, [cart]);

  const handlePrint = async () => {
    const printArea = document.getElementById("print-area");
    if (!printArea) return;

    const button = document.activeElement as HTMLButtonElement;
    const originalText = button?.innerText;
    if (button) {
      button.innerText = "Generating PDF...";
      button.disabled = true;
    }

    try {
      const canvas = await html2canvas(printArea, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        windowWidth: printArea.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(100);
        pdf.text(
          `Confirmation: ${confirmationNumber} | Printed: ${dayjs().format(
            "MMM DD, YYYY"
          )}`,
          pdfWidth / 2,
          pdfHeight - 8,
          { align: "center" }
        );
        pdf.text(`Page ${i} of ${pageCount}`, pdfWidth - 20, pdfHeight - 8, {
          align: "right",
        });
      }

      pdf.save(`booking-confirmation-${confirmationNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      if (button) {
        button.innerText = originalText || "Print Confirmation";
        button.disabled = false;
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "background.default"
            : "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Paper
              id="print-area"
              sx={{
                borderRadius: 3,
                p: { xs: 2, sm: 3, md: 4 },
                bgcolor: "background.paper",
                boxShadow: 2,
              }}
            >
              <Stack
                spacing={2}
                alignItems="center"
                sx={{ mb: 3, mt: 8 }}
                className="no-print"
              >
                <CheckCircleIcon
                  color="success"
                  sx={{ fontSize: { xs: 50, sm: 60 } }}
                />
                <Typography
                  variant="h5"
                  fontWeight={700}
                  textAlign="center"
                  sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" } }}
                >
                  Booking Confirmed!
                </Typography>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="0.875rem"
                  gutterBottom
                >
                  Confirmation Number
                </Typography>
                <Typography
                  fontWeight={600}
                  fontSize="1.1rem"
                  sx={{ mb: 3 }}
                  color="text.primary"
                >
                  {confirmationNumber}
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Customer Name
                    </Typography>
                    <Typography fontWeight={500} color="text.primary">
                      {confirmInfo?.customerName}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Email
                    </Typography>
                    <Typography fontWeight={500} color="text.primary">
                      {confirmInfo?.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Phone
                    </Typography>
                    <Typography fontWeight={500} color="text.primary">
                      {confirmInfo?.phone}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Booking Date
                    </Typography>
                    <Typography fontWeight={500} color="text.primary">
                      {dayjs().format("MM/DD/YYYY")}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Special Requests
                    </Typography>
                    <Typography fontWeight={500} color="text.primary">
                      {confirmInfo?.specialRequests || "None"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.875rem"
                      gutterBottom
                    >
                      Payment Method
                    </Typography>
                    <Chip
                      label={confirmInfo?.paymentMethod}
                      sx={{ fontWeight: 500 }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{ mb: 3 }}
                  color="text.primary"
                >
                  Your Bookings
                </Typography>

                {groupedHotels.map((hotel, hotelIdx) => (
                  <Box key={hotelIdx} sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        mb: 2,
                        color: "primary.main",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      }}
                    >
                      Hotel Name: {hotel.hotelName}
                    </Typography>
                    {hotel.hotelLocation && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Location: {hotel.hotelLocation}
                      </Typography>
                    )}

                    <Grid container spacing={2}>
                      {hotel.rooms.map((room, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "card.main"
                                  : "grey.50",
                              boxShadow: 1,
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: { xs: "100%", sm: 150 },
                                height: { xs: 180, sm: "100%" },
                                objectFit: "cover",
                              }}
                              image={room.roomPhotoUrl}
                              alt={room.roomType}
                            />
                            <Box
                              sx={{
                                flex: 1,
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box>
                                <Typography
                                  fontWeight={700}
                                  fontSize="1rem"
                                  color="text.primary"
                                  gutterBottom
                                >
                                  {room.roomType}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  mb={0.5}
                                >
                                  Room #{room.roomNumber}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  fontSize="0.875rem"
                                >
                                  {room.capacityOfAdults} Adults ·{" "}
                                  {room.capacityOfChildren} Children
                                </Typography>
                              </Box>
                              <Typography
                                color="primary.main"
                                fontWeight={700}
                                fontSize="1.1rem"
                                sx={{ mt: 1 }}
                              >
                                ${room.price}
                                <Typography
                                  component="span"
                                  color="text.secondary"
                                  fontSize="0.875rem"
                                  fontWeight={500}
                                >
                                  /night
                                </Typography>
                              </Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Total Cost
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary.main"
                    fontWeight={700}
                  >
                    ${totalCost}
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.secondary"
                      fontWeight={500}
                      sx={{ ml: 0.5 }}
                    >
                      /night
                    </Typography>
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Confirmed"
                  color="success"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 2.5,
                  }}
                />
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                className="no-print"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handlePrint}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Print Confirmation
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/home")}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Back to Home
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Confirmation;
