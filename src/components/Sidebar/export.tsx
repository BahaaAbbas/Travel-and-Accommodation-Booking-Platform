import {
  Home,
  Search,
  Hotel,
  ShoppingCart,
  AdminPanelSettings as Admin,
} from "@mui/icons-material";

export const sidebarItems = [
  { text: "Home", url: "/home", icon: <Home /> },
  { text: "Search", url: "/search", icon: <Search /> },
  { text: "Hotels", url: "/hotels", icon: <Hotel /> },
  { text: "Checkout", url: "/checkout", icon: <ShoppingCart /> },
  { text: "Admin", url: "/admin", icon: <Admin /> },
];
