import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchWithCheck from "../Search";

const HomeSearch = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (params: any) => {
    const query = new URLSearchParams(params as any).toString();
    navigate(`/search?${query}`);
  };

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
            fontSize: { xs: "2rem", sm: "3rem", md: "3rem", lg: "3rem" },
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
            marginBottom: "2rem !important",
          }}
        >
          Discover amazing hotels and destinations around the world
        </Typography>
      </Stack>

      <SearchWithCheck
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
    </Box>
  );
};

export default HomeSearch;
