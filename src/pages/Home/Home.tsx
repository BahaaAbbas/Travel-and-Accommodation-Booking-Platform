import React from "react";
import { Box } from "@mui/material";
import HomeSearch from "@/components/HomeSearch/HomeSearch";
import FeaturedDeals from "@/components/FeaturedDeals";
import RecentlyVisited from "@/components/RecentlyVisited";
import TrendingDestinations from "@/components/TrendingDestinations";

const Home: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <Box sx={{ px: 2 }}>
          <HomeSearch />
        </Box>

        <FeaturedDeals />
        <RecentlyVisited />
        <TrendingDestinations />
      </Box>
    </Box>
  );
};

export default Home;
