import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'apps/website-display/redux/slices/Account';
import { toast } from "react-toastify";
import { AppDispatch } from 'commons/redux/store';
import { useLogoutMutation } from 'commons/redux/apis/party/UserApi';
import useUserAuthentication from './useUserAuthentication';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { refreshToken } = useUserAuthentication();
  const [_logout, logoutResult] = useLogoutMutation();

  const logout = () => {
    dispatch(logoutAction());
    toast.info('خدا به همراهتان👋');
    _logout({ refreshToken });
  };

  return { logout };
}

export default useLogout;