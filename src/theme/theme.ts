import { type PaletteColorOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { lightColors, darkColors } from "./color";

type Mode = "light" | "dark";

export const getTheme = (mode: Mode) => {
  const colors = mode === "light" ? lightColors : darkColors;

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: colors.success },
      error: { main: colors.destructive },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
      accent: { main: colors.accent },
      foreground: { main: colors.foreground },
      mutedForeground: { main: colors.mutedForeground },
      border: { main: colors.border },
    },

    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      allVariants: {
        color: colors.textPrimary,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              boxShadow: `0 2px 8px ${
                mode === "light"
                  ? "hsl(210, 20%, 80% / 0.3)"
                  : "hsl(0, 0%, 0% / 0.4)"
              }`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
};

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    foreground: Palette["primary"];
    border: Palette["primary"];
    mutedForeground: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteColorOptions;
    foreground?: PaletteColorOptions;
    border?: PaletteColorOptions;
    mutedForeground?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
