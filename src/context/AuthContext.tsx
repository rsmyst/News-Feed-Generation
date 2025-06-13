import { createContext, useContext, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut();
  };

  const value = {
    isAuthenticated: !!session,
    user: session?.user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
