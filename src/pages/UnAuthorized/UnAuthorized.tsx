import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/Images/Logo.png";
import unAuth from "@/assets/Images/unauth.png";

const UnAuthorized = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { background, text, primary } = theme.palette;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${unAuth})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
        backgroundSize: "300px 300px",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.3)",
        },
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
          position: "relative",
          zIndex: 1,
          minWidth: 300,
          maxWidth: 400,
        }}
      >
        <Box component="img" src={Logo} alt="Logo" sx={{ width: 150, mb: 1 }} />

        <Typography variant="h1" fontWeight="bold" sx={{ color: primary.main }}>
          401
        </Typography>

        <Typography variant="h5" color={text.primary} fontWeight="bold">
          Unauthorized
        </Typography>

        <Typography color={text.secondary}>
          Sorry! No one dares to access the Unauthorized Page! Don't be sticky!
          🕵️‍♂️
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

export default UnAuthorized;
