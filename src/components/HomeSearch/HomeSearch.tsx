import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "../Buttons";
import CheckSH from "../CheckSearchHome/CheckSH";

const HomeSearch = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 10,
        width: "100%",
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "2rem",
              sm: "3rem",
              md: "3rem",
              lg: "3rem",
            },
            m: "auto !important",
          }}
        >
          Find Your Perfect Stay
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
              lg: "1.75rem",
            },
          }}
        >
          Discover amazing hotels and destinations around the world
        </Typography>
      </Stack>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
        spacing={2}
        direction="row"
      >
        <Box
          sx={{
            borderRadius: "12px",
            boxShadow: 2,
            overflow: "hidden",
            width: "100%",
            maxWidth: {
              xs: "300px",
              sm: "500px",
              md: "600px",
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for hotels, cities..."
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    color="action"
                    sx={{ color: theme.palette.text.secondary }}
                  />
                </InputAdornment>
              ),
              sx: {
                height: "44px",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                "& fieldset": { border: "none" },
              },
              backgroundColor: theme.palette.background.paper,
              transition: "all 0.3s ease",
              color: theme.palette.text.secondary,
            }}
          />
        </Box>
        <AppButton
          text="Search"
          bgColor={(theme) => theme.palette.success.main}
        />
      </Stack>

      <CheckSH />
    </Box>
  );
};

export default HomeSearch;
