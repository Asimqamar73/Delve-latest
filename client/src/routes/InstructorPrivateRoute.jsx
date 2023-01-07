import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function InstructorPrivateRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/instructor-login" />;
  }
  return children;
}

export default InstructorPrivateRoute;
