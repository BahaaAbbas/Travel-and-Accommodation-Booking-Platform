import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme/theme";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};

type mode = "light" | "dark";

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<mode>("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
