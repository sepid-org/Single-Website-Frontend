import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnonymousRoute = ({ base = '/' }) => {
  const location = useLocation();
  const { isAuthenticated } = useUserAuthentication();

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      toast.success(`خوش آمدید!`);
    }
  }, [isAuthenticated, location.pathname]);

  const previousLocation = location.state?.from?.pathname;
  const destinationLocation = previousLocation || base;

  if (isAuthenticated) {
    return <Navigate to={destinationLocation} replace />;
  }

  return <Outlet />;
};

export default AnonymousRoute;