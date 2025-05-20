import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'apps/website-display/redux/slices/Account';
import { toast } from "react-toastify";
import { AppDispatch } from 'commons/redux/store';
import { useLogoutMutation } from 'commons/redux/apis/party/UserApi';
import useUserAuthentication from './useUserAuthentication';
import { useEffect } from 'react';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { refreshToken } = useUserAuthentication();
  const [_logout, logoutResult] = useLogoutMutation();

  useEffect(() => {
    if (logoutResult.isSuccess) {
      toast.info('خدا به همراهتان👋');
    };
  }, [logoutResult.isSuccess]);

  const logout = () => {
    dispatch(logoutAction());
    _logout({ refreshToken });
  };

  return { logout, ...logoutResult };
}

export default useLogout;