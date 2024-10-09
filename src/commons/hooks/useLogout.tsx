import { logoutAction } from 'apps/website-display/redux/slices/Account';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    toast.info('خدا به همراهتان👋');
    dispatch(logoutAction());
  };

  return { logout };
}

export default useLogout;