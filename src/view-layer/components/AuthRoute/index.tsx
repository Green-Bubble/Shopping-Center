import { ComponentType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useAuthContext } from "@view/contexts/AuthContext";

const AuthRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  const { redirectTo } = queryString.parse(location.search);

  if (isAuthenticated === "authenticated") {
    return <Navigate to={(redirectTo as string) || "/products"} />;
  }

  return <>{children}</>;
};

export const withAuthRoute =
  <P extends object>(Component: ComponentType<P>) =>
  (Props: P) =>
    (
      <AuthRoute>
        <Component {...Props} />
      </AuthRoute>
    );

export default AuthRoute;
