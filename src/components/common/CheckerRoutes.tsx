import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/features/hooks";
import { selectCartItems } from "@/features/cart/cartSelectors";

export const ProtectedCartRoute = () => {
  const cartItems = useAppSelector(selectCartItems);

  if (cartItems.length === 0) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
};

export const ProtectedConfirmationRoute = () => {
  const location = useLocation();
  const { confirmInfo, cartSnapshot } = location.state || {};

  if (!confirmInfo && !cartSnapshot) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
};
