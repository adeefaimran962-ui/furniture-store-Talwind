import { createContext, useContext, useState } from 'react';

export interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  location: string;
  joined: string;
  orders: number;
  wishlist: number;
}

interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
