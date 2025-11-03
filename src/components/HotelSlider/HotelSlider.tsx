import React, { useState } from "react";
import { Box, IconButton, Typography, Fade } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import type { HotelSliderProps } from "@/types/HotelTypes";

const HotelSlider: React.FC<HotelSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 300, md: 500 },
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {images.map((img, index) => (
        <Fade key={index} in={index === currentIndex} timeout={600}>
          <Box
            component="img"
            src={img}
            alt={`Slide ${index}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Fade>
      ))}

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ArrowBackIosNew />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "background.default",
          color: "white",
          borderRadius: 2,
          px: 2,
          py: 0.5,
        }}
      >
        <Typography variant="body2" fontWeight={700} color="text.primary">
          {currentIndex + 1} / {images.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default HotelSlider;
