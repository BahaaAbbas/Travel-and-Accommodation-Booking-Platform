import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useThemeContext } from "@/context/ThemeContext";
import { alpha } from "@mui/material/styles";
import type { HeaderProps } from "@/types/headerTypes";
import { useNavigate } from "react-router-dom";

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [elevated, setElevated] = useState(false);
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleScroll = () => {
    setElevated(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={elevated ? 2 : 0}
      sx={{
        transition:
          "background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
        backgroundColor: elevated
          ? alpha(theme.palette.background.paper, 0.8)
          : theme.palette.background.default,
        color: theme.palette.text.primary,
        backdropFilter: elevated ? "blur(8px)" : "none",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onToggleSidebar}
          sx={{
            transform: isSidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition:
              "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
            borderRadius: "12px",
            "&:hover": {
              background:
                mode === "light"
                  ? "linear-gradient(145deg, #f0f0f0, #e0e0e0)"
                  : "linear-gradient(145deg, #2b2b2b, #1f1f1f)",
              boxShadow:
                mode === "light"
                  ? "0 4px 10px rgba(0,0,0,0.1)"
                  : "0 4px 12px rgba(0,0,0,0.6)",
              transform: "scale(1.05)",
            },
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            marginLeft: 1,
            fontWeight: "700",
            background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TravelBook
        </Typography>

        <Box sx={{ display: { xs: "block", md: "block", lg: "none" } }}>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>

        {/* Theme toggle */}
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{
            transition:
              "background-color 0.3s, box-shadow 0.3s, transform 0.3s",
            borderRadius: "12px",
            "&:hover": {
              background:
                mode === "light"
                  ? "linear-gradient(145deg, #e3f2fd, #bbdefb)"
                  : "linear-gradient(145deg, #283593, #1a237e)",
              boxShadow:
                mode === "light"
                  ? "0 4px 10px rgba(25, 118, 210, 0.3)"
                  : "0 4px 14px rgba(144, 202, 249, 0.4)",
              transform: "scale(1.05)",
            },
          }}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
