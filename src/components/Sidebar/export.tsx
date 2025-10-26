import {
  Home,
  Search,
  ShoppingCart,
  Bed,
  AdminPanelSettings as Admin,
} from "@mui/icons-material";

export const sidebarItems = [
  { text: "Home", url: "/home", icon: <Home /> },
  { text: "Search", url: "/search", icon: <Search /> },
  { text: "Rooms", url: "/rooms", icon: <Bed /> },
  { text: "Cart", url: "/cart", icon: <ShoppingCart /> },
  { text: "Admin", url: "/admin", icon: <Admin /> },
];
