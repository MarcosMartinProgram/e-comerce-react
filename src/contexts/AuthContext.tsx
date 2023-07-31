import React, { createContext, useState, useEffect, ReactNode } from 'react';


export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (accessToken: string, userData: UserData) => void;
  logout: () => void;
  isAdmin: (userData: UserData | null) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userData: null,
  login: () => {},
  logout: () => {},
  isAdmin: () => false,
  

});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userDataString = localStorage.getItem('userData');
    if (accessToken && userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setIsAuthenticated(true);
      setUserData(parsedUserData);
    }
  }, []);

  const login = async (accessToken: string, userData: UserData) => {
    setIsAuthenticated(true);
    setUserData({ id: 0, email: userData.email, password: '', name: '', role: '', avatar: '' }); 

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario.');
      }

      const userData = await response.json();
      setUserData(userData); 
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
      logout(); 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  };

  const isAdmin = () => {
    return isAuthenticated && userData?.role === 'admin';
  };

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('userData:', userData);
  }, [isAuthenticated, userData]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};











