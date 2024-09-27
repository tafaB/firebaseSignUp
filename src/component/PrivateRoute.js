import { useAuthValue } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const { currentUser } = useAuthValue();
  if (!currentUser || !currentUser.emailVerified) {
    return <Navigate to="/sign-up" replace />;
  }
  return children;
}
export default PrivateRoute;
