import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to.
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
