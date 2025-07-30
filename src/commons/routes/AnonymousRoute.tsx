import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnonymousRoute = ({ base = '/' }) => {
  const location = useLocation();
  const { isUserAuthenticated } = useUserAuthentication();

  const previousLocation = location.state?.from?.pathname;
  const destinationLocation = previousLocation || base;

  if (isUserAuthenticated) {
    return <Navigate to={destinationLocation} replace />;
  }

  return <Outlet />;
};

export default AnonymousRoute;