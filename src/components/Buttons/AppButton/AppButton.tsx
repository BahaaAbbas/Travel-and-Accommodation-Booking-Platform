import React from "react";
import { Button, useTheme } from "@mui/material";
import { darken } from "@mui/material/styles";
import type { SearchButtonProps } from "@/types/buttonTypes";

const AppButton: React.FC<SearchButtonProps> = ({
  text,
  padding = "2px 24px",
  bgColor,
  onClick,
}) => {
  const theme = useTheme();
  const backgroundColor =
    typeof bgColor === "function"
      ? bgColor(theme)
      : bgColor || theme.palette.primary.main;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "8px",
        padding,
        height: "44px",
        background: backgroundColor,
        color: theme.palette.text.primary,
        boxShadow: "none",
        "&:hover": {
          background: darken(theme.palette.success.main, 0.2),
          boxShadow: "none",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default AppButton;
