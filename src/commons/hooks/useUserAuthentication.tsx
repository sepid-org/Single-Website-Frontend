import { useCheckAuthenticationQuery } from "commons/redux/apis/party/UserApi";
import { RootState } from 'commons/redux/store';
import { useSelector } from "react-redux";

const useUserAuthentication = () => {
  const { data, isLoading } = useCheckAuthenticationQuery();

  const accessToken = useSelector((state: RootState) => state.account.accessToken);
  const refreshToken = useSelector((state: RootState) => state.account.refreshToken);

  const isAuthenticated = isLoading ? false : data.status === 'authenticated';

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    isAuthenticatedLoading: isLoading,
  };
}

export default useUserAuthentication;