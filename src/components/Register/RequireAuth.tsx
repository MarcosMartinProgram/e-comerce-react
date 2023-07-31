import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../contexts/AuthContext';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;

