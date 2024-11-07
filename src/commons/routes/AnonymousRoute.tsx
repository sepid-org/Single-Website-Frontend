import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnonymousRoute = ({ base = '/' }) => {
  const location = useLocation();
  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    if (accessToken && location.pathname === '/login') {
      toast.success(`خوش آمدید!`);
    }
  }, [accessToken, location.pathname]);

  const previousLocation = location.state?.from?.pathname;
  const destinationLocation = previousLocation || base;

  if (accessToken) {
    return <Navigate to={destinationLocation} replace />;
  }

  return <Outlet />;
};

export default AnonymousRoute;