import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import RootRedirect from "@/components/common/RootRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
    errorElement: <NotFound />,
  },
  { path: "login", element: <Login /> },
  {
    element: <ProtectedRoute allowedRoles={["Admin", "User"]} />,
    children: [
      {
        path: "home",
        element: <div>home</div>,
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["Admin"]} />,
    children: [
      {
        path: "admin",
        element: <div>admin</div>,
      },
    ],
  },
]);

export default router;
