import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../contexts/AuthContext';

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

const RedirectIfAuthenticated = ({ children }: RedirectIfAuthenticatedProps) => {
  const authContext = useContext(AuthContext);

  if (authContext.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default RedirectIfAuthenticated;

