import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'apps/website-display/redux/slices/Account';
import { toast } from "react-toastify";
import { AppDispatch } from 'commons/redux/store';
import { useLogoutMutation } from 'commons/redux/apis/party/UserApi';
import { useEffect } from 'react';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [_logout, logoutResult] = useLogoutMutation();

  useEffect(() => {
    if (logoutResult.isSuccess) {
      toast.info('خدا به همراهتان👋');
      dispatch(logoutAction());
    }
  }, [logoutResult])

  const logout = () => {
    _logout();
  };

  return { logout };
}

export default useLogout;