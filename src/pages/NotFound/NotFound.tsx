import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/Images/Logo.png";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { background, text, error } = theme.palette;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: background.default,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: "center",
          alignItems: "center",
          bgcolor: background.paper,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ width: 150, height: 150, mb: 1 }}
        />

        <Typography variant="h1" fontWeight="bold" sx={{ color: error.main }}>
          404
        </Typography>

        <Typography variant="h5" color={error.main} fontWeight="bold">
          Page Not Found
        </Typography>

        <Typography color={text.secondary}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Go Back
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
