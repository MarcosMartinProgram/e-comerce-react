import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated || authContext.userData?.role !== 'admin') {
    
    return <Navigate to="/" replace />;
  }

  
  return <>{children}</>;
};

export default RequireAdmin;

