import { Box, Typography, Stack } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { lightColors, darkColors } from "../../theme/color";

const ThemeTesting = () => {
  const theme = useTheme();

  const colorsLight = [
    { name: "Primary", value: lightColors.primary },
    { name: "Secondary", value: lightColors.secondary },
    { name: "Background", value: lightColors.background },
    { name: "Surface", value: lightColors.surface },
    { name: "Text Primary", value: lightColors.textPrimary },
    { name: "Text Secondary", value: lightColors.textSecondary },
    { name: "Error", value: lightColors.error },
  ];

  const colorsDark = [
    { name: "Primary", value: darkColors.primary },
    { name: "Secondary", value: darkColors.secondary },
    { name: "Background", value: darkColors.background },
    { name: "Surface", value: darkColors.surface },
    { name: "Text Primary", value: darkColors.textPrimary },
    { name: "Text Secondary", value: darkColors.textSecondary },
    { name: "Error", value: darkColors.error },
  ];

  const renderColors = (colorsArray: typeof colorsLight) => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {colorsArray.map((color) => (
        <Box
          key={color.name}
          width={100}
          height={100}
          bgcolor={color.value}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          boxShadow={3}
          m={1}
        >
          <Typography
            variant="caption"
            color={theme.palette.getContrastText(color.value)}
            textAlign="center"
          >
            {color.name}
          </Typography>
        </Box>
      ))}
    </Stack>
  );

  return (
    <Box p={2}>
      <Typography variant="h6" mt={2} mb={1}>
        Light Theme
      </Typography>
      {renderColors(colorsLight)}

      <Typography variant="h6" mt={2} mb={1}>
        Dark Theme
      </Typography>
      {renderColors(colorsDark)}
    </Box>
  );
};

export default ThemeTesting;
