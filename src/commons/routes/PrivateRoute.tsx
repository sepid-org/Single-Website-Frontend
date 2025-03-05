import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ loginUrl = '/login/' }) => {
  const location = useLocation();
  const { isUserAuthenticated } = useUserAuthentication();

  if (isUserAuthenticated === false) {
    return <Navigate state={{ from: location }} to={loginUrl} replace />
  }
  return <Outlet />
};

export default PrivateRoute;