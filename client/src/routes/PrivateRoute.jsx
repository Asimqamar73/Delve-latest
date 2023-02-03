import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login3" />;
  }
  return children;
}

export default PrivateRoute;
