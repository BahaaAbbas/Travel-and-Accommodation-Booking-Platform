import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/theme/theme";
import SearchCard from "./SearchCard";
import type { SearchCardProps } from "@/types/search";

const meta: Meta<typeof SearchCard> = {
  title: "Components/Cards/Search Card",
  component: SearchCard,
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

type Story = StoryObj<typeof SearchCard>;

const handleViewDetails = (hotelId: number) => {
  console.log("View details clicked for hotel ID:", hotelId);
};

const baseHotel: SearchCardProps["hotel"] = {
  hotelId: 1,
  hotelName: "Seaside Comfort",
  roomPhotoUrl:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
  cityName: "Santorini, Greece",
  starRating: 4.5,
  roomPrice: 220,
  discount: 10,
  amenities: ["Free WiFi", "Pool", "Breakfast Included"],
};

export const Default: Story = {
  args: {
    hotel: { ...baseHotel },
    onViewDetails: handleViewDetails,
  } as SearchCardProps,
};

export const WithDiscount: Story = {
  args: {
    hotel: {
      ...baseHotel,
      hotelId: 2,
      hotelName: "Mountain View Resort",
      roomPhotoUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      discount: 15,
      roomPrice: 180,
      starRating: 4.7,
      cityName: "Aspen, Colorado",
      amenities: ["Free WiFi", "Spa", "Gym"],
    },
    onViewDetails: handleViewDetails,
  } as SearchCardProps,
};

export const LuxuryHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      hotelId: 3,
      hotelName: "Royal Palace Hotel",
      roomPhotoUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      starRating: 5,
      roomPrice: 520,
      roomType: "Presidential Suite",
      cityName: "Dubai, UAE",
      amenities: ["Private Pool", "Butler Service", "Spa"],
    },
    onViewDetails: handleViewDetails,
  } as SearchCardProps,
};

export const BudgetStayHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      hotelId: 4,
      hotelName: "City Budget Inn",
      roomPhotoUrl:
        "https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720?fit=crop,1&wid=1440&hei=720",
      roomPrice: 85,
      starRating: 3.8,
      roomType: "Standard Room",
      cityName: "Berlin, Germany",
      amenities: ["Free WiFi", "Breakfast Included"],
    },
    onViewDetails: handleViewDetails,
  } as SearchCardProps,
};

export const TropicalHotel: Story = {
  args: {
    hotel: {
      ...baseHotel,
      hotelId: 5,
      hotelName: "Tropical Escape Resort",
      roomPhotoUrl:
        "https://w-hotels.marriott.com/wp-content/uploads/2025/08/Punta-Cana-hero-m.jpg",
      roomPrice: 290,
      starRating: 4.9,
      discount: 10,
      roomType: "Ocean View Suite",
      cityName: "Bali, Indonesia",
      amenities: ["Private Beach", "Pool", "Spa", "All-Inclusive"],
    },
    onViewDetails: handleViewDetails,
  } as SearchCardProps,
};
