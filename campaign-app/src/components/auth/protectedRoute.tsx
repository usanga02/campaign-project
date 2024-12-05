import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContextType, useAuth } from "../../context/AuthProvider";

const ProtectedRoute = () => {
  const { user } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
