import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LocationOn as MapPin,
  CalendarToday as Calendar,
  People as Users,
  Language as Languages,
  AttachMoney as Banknote,
  Star,
} from "@mui/icons-material";
import { useDestinationById } from "@/hooks/useHomeQueries";

const Destinations = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cityId } = useParams();

  const {
    data: destination,
    isLoading,
    isError,
  } = useDestinationById(Number(cityId));

  if (isLoading)
    return (
      <Typography
        textAlign="center"
        mt={4}
        color={theme.palette.text.secondary}
      >
        Loading destination...
      </Typography>
    );

  if (isError || !destination)
    return (
      <Typography textAlign="center" color="error" mt={4}>
        Destination not found.
      </Typography>
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <Box
        sx={{
          position: "relative",
          height: { xs: "50vh", md: "60vh" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={destination.thumbnailUrl}
          alt={destination.cityName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${theme.palette.background.default} 0%, ${theme.palette.background.default}99 40%, transparent 100%)`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: { xs: 3, md: 6 },
          }}
        >
          <Container maxWidth="lg">
            <Chip
              label="Trending Destination"
              color="primary"
              sx={{
                mb: 2,
                backdropFilter: "blur(6px)",
                fontWeight: 500,
                color: "#fff",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#fff",
                textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                mb: 1,
                fontSize: { xs: "2.5rem", md: "4rem" },
              }}
            >
              {destination.cityName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <MapPin sx={{ fontSize: 22 }} />
              <Typography variant="h6" color="#fff">
                {destination.countryName}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* CONTENT SECTION */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          {/* ABOUT SECTION */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              About {destination.cityName}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}
            >
              {destination.description}
            </Typography>
          </Box>

          {/* QUICK INFO SECTION — Equal Height Cards */}
          <Grid container spacing={2} sx={{ mb: 8 }}>
            {destination.bestTimeToVisit && (
              <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Calendar color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography color="text.secondary" fontSize="0.9rem">
                      Best Time
                    </Typography>
                    <Typography fontWeight={600}>
                      {destination.bestTimeToVisit}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {destination.population && (
              <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Users color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography color="text.secondary" fontSize="0.9rem">
                      Population
                    </Typography>
                    <Typography fontWeight={600}>
                      {destination.population}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {destination.language && (
              <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Languages color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography color="text.secondary" fontSize="0.9rem">
                      Language
                    </Typography>
                    <Typography fontWeight={600}>
                      {destination.language}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {destination.currency && (
              <Grid size={{ xs: 6, md: 3 }} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Banknote color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography color="text.secondary" fontSize="0.9rem">
                      Currency
                    </Typography>
                    <Typography fontWeight={600}>
                      {destination.currency}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* TOP ATTRACTIONS SECTION — Equal Height Cards */}
          {destination.highlights && destination.highlights.length > 0 && (
            <Box sx={{ mb: 10 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Top Attractions
              </Typography>
              <Grid container spacing={2}>
                {destination.highlights.map((highlight, index) => (
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    key={index}
                    sx={{ display: "flex" }}
                  >
                    <Card
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Star sx={{ color: "#fff", fontSize: 28 }} />
                        </Box>
                        <Typography fontWeight={600} fontSize="1.1rem">
                          {highlight}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* CALL TO ACTION SECTION */}
          <Card
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "#fff",
              border: "none",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 5, md: 8 },
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Ready to Explore {destination.cityName}?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  maxWidth: 600,
                  mx: "auto",
                  fontSize: "1.1rem",
                }}
              >
                Discover the best hotels and accommodations in{" "}
                {destination.cityName}. Start planning your perfect getaway
                today.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() =>
                  navigate(`/search?location=${destination.cityName}`)
                }
                sx={{
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  bgcolor: "#fff",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#f0f0f0" },
                }}
              >
                View Hotels in {destination.cityName}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Destinations;
