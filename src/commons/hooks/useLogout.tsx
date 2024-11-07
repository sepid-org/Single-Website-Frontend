import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'apps/website-display/redux/slices/Account';
import { toast } from "react-toastify";
import { AppDispatch } from 'commons/redux/store';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    toast.info('خدا به همراهتان👋');
    dispatch(logoutAction());
  };

  return { logout };
}

export default useLogout;