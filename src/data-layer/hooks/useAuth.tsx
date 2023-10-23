import { useCallback, useEffect, useState } from "react";
import useAsyncAction from "./useAsyncAction";
import User, { UserWithCredentials } from "@data/models/user";
import toast from 'react-hot-toast';
import { Users } from "@data/api/services/users";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<
    "authenticated" | "unauthenticated" | "unknown"
  >("unknown");
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString) as User;
      setUser(user);
    } else {
      setIsAuthenticated("unauthenticated");
    }
  }, []);

  const [login, isLoggingIn] = useAsyncAction<
    User,
    [email: string, password: string]
  >(
    useCallback(async (email, password) => {
      const user = await Users.signIn(email, password);
      if (!user) {
        toast.error("Incorrect credentials");
        throw new Error("user does not exist");
      }
      return user as User;
    }, []),
    useCallback((user: User) => {
      setUser(user);
    }, [])
  );

  const [signup, isSigningUp] = useAsyncAction<
    User,
    [user: UserWithCredentials]
  >(
    useCallback(async (user) => {
      const newUser = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(user);
        }, 3000);
      });
      return newUser as User;
    }, []),
    useCallback((user: User) => {
      setUser(user);
    }, [])
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated("authenticated");
    } else {
      if (isAuthenticated === "authenticated") {
        localStorage.removeItem("user");
        setIsAuthenticated("unauthenticated");
      }
    }
  }, [user, isAuthenticated]);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    isLoggingIn,
    isSigningUp,
  };
};

export default useAuth;
