import { useCheckAuthenticationQuery } from "commons/redux/apis/party/UserApi";

const useUserAuthentication = () => {
  const { data, isLoading } = useCheckAuthenticationQuery();

  const isAuthenticated = isLoading ? undefined : data.status === 'authenticated';

  return {
    isAuthenticated,
  };
}

export default useUserAuthentication;