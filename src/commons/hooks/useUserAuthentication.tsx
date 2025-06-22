import { useCheckAuthenticationQuery } from "commons/redux/apis/party/UserApi";
import { RootState } from 'commons/redux/store';
import { useSelector } from "react-redux";

const useUserAuthentication = () => {
  const { data, isLoading } = useCheckAuthenticationQuery();

  const accessToken = useSelector((state: RootState) => state.account.accessToken);
  const refreshToken = useSelector((state: RootState) => state.account.refreshToken);

  const isUserAuthenticated = isLoading ? (Boolean(accessToken) ? true : false) : (data?.status === 'authenticated');

  return {
    accessToken,
    refreshToken,
    isUserAuthenticated,
    isUserAuthenticatedLoading: isLoading,
  };
}

export default useUserAuthentication;