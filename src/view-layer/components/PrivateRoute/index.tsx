import { useAuthContext } from "@view/contexts/AuthContext";
import Loading from "@pages/Loading";
import { ComponentType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === "unknown") {
    return <Loading />;
  }

  if (isAuthenticated === "unauthenticated") {
    if (pathname !== "/") {
      return (
        <Navigate to={`/login?redirectTo=${encodeURIComponent(pathname)}`} />
      );
    }
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const withPrivateRoute =
  <P extends object>(Component: ComponentType<P>) =>
  (Props: P) =>
    (
      <PrivateRoute>
        <Component {...Props} />
      </PrivateRoute>
    );

export default PrivateRoute;
