import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import type { DestinationCardProps } from "@/types/homeTypes";

const TrendingCard: React.FC<DestinationCardProps> = ({
  city,
  country,
  imageUrl,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        position: "relative",
        cursor: "pointer",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={`${city}, ${country} at sunset`}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          padding: 2,

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: 200,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="div"
            fontWeight="bold"
            sx={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
              marginBottom: 0.5,
              color: "#fff",
            }}
          >
            {city}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
              opacity: 0.9,
              color: "#fff",
            }}
          >
            {country}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default TrendingCard;
