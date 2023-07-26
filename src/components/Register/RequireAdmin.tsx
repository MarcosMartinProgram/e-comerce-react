import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface RequireAdminProps {
  children: ReactNode;
  fallback?: ReactNode; // Opcional, el componente que se mostrará si el usuario no es admin
}

const RequireAdmin = ({ children, fallback }: RequireAdminProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated || authContext.userData?.role !== 'admin') {
    return fallback ? fallback : <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;


