import { useSelector } from "react-redux";

const useUserAuthentication = () => {
  const accessToken = useSelector((state: any) => state.account.accessToken);

  const isAuthenticated = Boolean(accessToken);
  return {
    isAuthenticated,
    accessToken,
  };
}

export default useUserAuthentication;