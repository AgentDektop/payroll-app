import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
