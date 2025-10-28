import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/theme/theme";
import HotelCard from "./HotelCard";
import type { HotelCardProps } from "@/types/homeTypes";

const meta: Meta<typeof HotelCard> = {
  title: "Components/Cards/Hotel Card",
  component: HotelCard,
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
          <div style={{ width: 350 }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof HotelCard>;

const handleViewDetails = (id: string) => {
  console.log("View details clicked for hotel ID:", id);
};

const baseHotel = {
  id: "1",
  image:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
  description: "A cozy hotel with modern design and sea view.",
  location: "Santorini, Greece",
  rating: 4.5,
  price: 220,
  discount: 10,
};

export const Default: Story = {
  args: {
    hotel: {
      ...baseHotel,
      id: "1",
      name: "Seaside Comfort",
    },
    onViewDetails: handleViewDetails,
  } as HotelCardProps,
};

export const WithDiscount: Story = {
  args: {
    hotel: {
      ...baseHotel,
      id: "2",
      name: "Mountain View Resort",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      discount: 15,
      price: 180,
      rating: 4.7,
      location: "Aspen, Colorado",
    },
    onViewDetails: handleViewDetails,
  } as HotelCardProps,
};

export const LuxuryHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      id: "3",
      name: "Royal Palace Hotel",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      rating: 5,
      price: 520,
      description:
        "An exclusive 5-star experience with premium service and oceanfront suites.",
      location: "Dubai, UAE",
    },
    onViewDetails: handleViewDetails,
  } as HotelCardProps,
};

export const BudgetHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      id: "4",
      name: "City Budget Inn",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      price: 85,
      rating: 3.8,
      description: "Affordable rooms in the city center, great for travelers.",
      location: "Berlin, Germany",
    },
    onViewDetails: handleViewDetails,
  } as HotelCardProps,
};

export const ResortHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      id: "5",
      name: "Tropical Escape Resort",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      price: 290,
      rating: 4.9,
      discount: 10,
      description:
        "Enjoy private beaches and luxurious amenities in this tropical paradise.",
      location: "Bali, Indonesia",
    },
    onViewDetails: handleViewDetails,
  } as HotelCardProps,
};
