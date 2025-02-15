import { useCheckAuthenticationQuery } from "commons/redux/apis/party/UserApi";

const useUserAuthentication = () => {
  const { data, isLoading } = useCheckAuthenticationQuery();

  const isAuthenticated = isLoading ? false : data.status === 'authenticated';

  return {
    isAuthenticated,
    isAuthenticatedLoading: isLoading,
  };
}

export default useUserAuthentication;