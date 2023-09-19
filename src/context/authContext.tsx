"use client";
import { AuthUserType } from "@/common/types";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import { createContext, useContext } from "react";

type AuthContextType = {
  authUser: AuthUserType | null;
  loading: boolean;
  login: Function;
  logout: Function;
  signup: Function;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  loading: true,
  login: () => {},
  logout: () => {},
  signup: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <AuthContext.Provider value={auth as any}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
