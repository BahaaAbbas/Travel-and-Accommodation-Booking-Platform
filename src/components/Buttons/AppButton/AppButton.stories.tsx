import type { Meta, StoryObj } from "@storybook/react";
import AppButton from "./AppButton";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/theme/theme";

const meta: Meta<typeof AppButton> = {
  title: "Components/AppButton",
  component: AppButton,
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
          <Story />
        </ThemeProvider>
      );
    },
  ],
  argTypes: {
    text: { control: "text", description: "Button label text" },
    padding: { control: "text", description: 'CSS padding (e.g. "2px 24px")' },
    bgColor: {
      control: "color",
      description: "Background color of the button",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof AppButton>;

export const Default: Story = {
  args: {
    text: "Search",
  },
};

export const CustomColor: Story = {
  args: {
    text: "Custom Color",
    bgColor: "#ff4081",
  },
};

export const Padded: Story = {
  args: {
    text: "Wide Padding",
    padding: "10px 40px",
  },
};
