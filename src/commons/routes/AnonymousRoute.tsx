import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AnonymousRoute = ({ }) => {
  const location = useLocation();
  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    if (accessToken) {
      toast.success(`خوش آمدی!`)
    }
  }, [accessToken])

  const previousLocation = location.state?.from?.pathname
  const destinationLocation = previousLocation || '/';

  if (accessToken) {
    return <Navigate state={{ from: location }} to={destinationLocation} />
  }

  return <Outlet />
};

export default AnonymousRoute;