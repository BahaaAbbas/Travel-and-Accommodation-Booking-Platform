import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import RootRedirect from "@/components/common/RootRedirect";
import UnAuthorized from "@/pages/UnAuthorized";
import Home from "@/pages/Home";
import DashboardLayout from "@/layouts/DashboardLayout";
import BookingForm from "@/components/ThemeTesting/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
    errorElement: <NotFound />,
  },
  { path: "login", element: <Login /> },
  { path: "unauthorized", element: <UnAuthorized /> },
  {
    element: <DashboardLayout />,
    children: [
      { path: "test", element: <Home /> },
      { path: "test1", element: <BookingForm /> },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["Admin", "User"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <Home /> },
          { path: "profile", element: <div>Profile Page</div> },
          { path: "settings", element: <div>Settings Page</div> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["Admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [{ path: "admin", element: <div>Admin Panel</div> }],
      },
    ],
  },
]);

export default router;
