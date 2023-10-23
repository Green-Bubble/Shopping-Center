import { createContext, useContext, PropsWithChildren } from "react";
import User, { UserWithCredentials } from "@data/models/user";
import useAuth from "@data/hooks/useAuth";

const AuthContext = createContext<
  | {
      isAuthenticated: "authenticated" | "unauthenticated" | "unknown";
      user?: User;
      isLoggingIn: boolean;
      isSigningUp: boolean;
      login: (email: string, password: string) => Promise<User | undefined>;
      signup: (user: UserWithCredentials) => Promise<User | undefined>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const value = useAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext mustbe used within a AuthProvider");
  }

  return context;
};
