import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ }) => {
  const location = useLocation();
  const accessToken = useSelector((state: any) => state.account.accessToken);

  if (!accessToken) {
    return <Navigate state={{ from: location }} to={'/login/'} />
  }
  return <Outlet />
};

export default PrivateRoute;