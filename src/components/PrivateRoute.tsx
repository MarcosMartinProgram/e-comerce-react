import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAdmin = true; 

  return (
    <Route
      {...rest}
      element={isAdmin ? <Component {...rest} /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;




