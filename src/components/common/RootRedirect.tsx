import { selectAuth } from "@/features/auth/authSlectors";
import { useAppSelector } from "@/features/hooks";
import type { JwtPayload } from "@/types/commonTypes";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RootRedirect = () => {
  const navigate = useNavigate();
  const { token, userType } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login", { replace: true });
      } else {
        if (userType === "Admin") {
          navigate("/manage-users", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      navigate("/login", { replace: true });
    }
  }, [token, userType, navigate]);
  return null;
};

export default RootRedirect;
