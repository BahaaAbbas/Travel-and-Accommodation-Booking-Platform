import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/theme/theme";
import TrendingCard from "./TrendingCard";
import type { DestinationCardProps } from "@/types/homeTypes";

const meta: Meta<typeof TrendingCard> = {
  title: "Components/Cards/Trending Card",
  component: TrendingCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme as "light" | "dark") || "light";
      const theme = getTheme(mode);

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ width: 300 }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof TrendingCard>;

const baseDestination: DestinationCardProps = {
  city: "Santorini",
  country: "Greece",
  imageUrl:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
};

export const Default: Story = {
  args: {
    ...baseDestination,
  },
};

export const AsianDestination: Story = {
  args: {
    city: "Bali",
    country: "Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
};

export const AmericanDestination: Story = {
  args: {
    city: "New York",
    country: "USA",
    imageUrl:
      "https://img.goodfon.com/wallpaper/nbig/7/74/ssha-gorod-niu-iork-niu-iork-noch-million-ognei.webp",
  },
};

export const EuropeanDestination: Story = {
  args: {
    city: "Paris",
    country: "France",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
};

export const MountainDestination: Story = {
  args: {
    city: "Zermatt",
    country: "Switzerland",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  },
};
