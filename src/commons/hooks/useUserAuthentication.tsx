import { useCheckAuthenticationQuery } from "commons/redux/apis/party/UserApi";

const useUserAuthentication = () => {
  const { isSuccess, isLoading } = useCheckAuthenticationQuery();

  const isAuthenticated = isLoading ? undefined : isSuccess;

  return {
    isAuthenticated,
  };
}

export default useUserAuthentication;