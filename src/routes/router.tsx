import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import RootRedirect from "@/components/common/RootRedirect";
import UnAuthorized from "@/pages/UnAuthorized";
import Home from "@/pages/Home";
import DashboardLayout from "@/layouts/DashboardLayout";
import Search from "@/pages/Search";
import Hotels from "@/pages/Hotels";
import Destinations from "@/pages/Destinations";
import Cart from "@/pages/Cart/Cart";
import Rooms from "@/pages/Rooms";
import Checkout from "@/pages/Checkout";
import Confirmation from "@/pages/Confirmation";
import Admin from "@/pages/Admin";
import {
  ProtectedCartRoute,
  ProtectedConfirmationRoute,
} from "@/components/common/CheckerRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
    errorElement: <NotFound />,
  },
  { path: "login", element: <Login /> },
  { path: "unauthorized", element: <UnAuthorized /> },

  {
    element: <ProtectedRoute allowedRoles={["Admin", "User"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "search", element: <Search /> },
          { path: "hotels/:hotelId", element: <Hotels /> },
          { path: "rooms", element: <Rooms /> },
          { path: "cart", element: <Cart /> },
          { path: "destination/:cityId", element: <Destinations /> },

          // { path: "checkout", element: <Checkout /> },
          // { path: "confirmation", element: <Confirmation /> },
          {
            element: <ProtectedCartRoute />,
            children: [{ path: "checkout", element: <Checkout /> }],
          },
          {
            element: <ProtectedConfirmationRoute />,
            children: [{ path: "confirmation", element: <Confirmation /> }],
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["Admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [{ path: "admin", element: <Admin /> }],
      },
    ],
  },
]);

export default router;
