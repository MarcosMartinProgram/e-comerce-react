import React, { createContext, useState } from 'react';

export interface UserData {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userData: null,
  login: () => {
    throw new Error('login function not implemented');
  },
  logout: () => {
    throw new Error('logout function not implemented');
  },
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const login = async (token: string) => {
    localStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};







