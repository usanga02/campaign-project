import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "../../context/AuthProvider";

const UnprotectedRoute = () => {
  const { user } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default UnprotectedRoute;
