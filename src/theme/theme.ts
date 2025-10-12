import { createTheme } from "@mui/material";
import { darkColors, lightColors } from "./color.ts";

type mode = "light" | "dark";

export const getTheme = (mode: mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? lightColors.primary : darkColors.primary,
      },
      secondary: {
        main: mode === "light" ? lightColors.secondary : darkColors.secondary,
      },
      background: {
        default:
          mode === "light" ? lightColors.background : darkColors.background,
        paper: mode === "light" ? lightColors.surface : darkColors.surface,
      },
      text: {
        primary:
          mode === "light" ? lightColors.textPrimary : darkColors.textPrimary,
        secondary:
          mode === "light"
            ? lightColors.textSecondary
            : darkColors.textSecondary,
      },
      error: {
        main: mode === "light" ? lightColors.error : darkColors.error,
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });
