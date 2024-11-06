import { useGetUserProfileQuery } from "commons/redux/apis/party/ProfileSlice";
import { useSelector } from "react-redux";

const useUserProfile = () => {
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetUserProfileQuery({ userId: userInfo.id });
  const fullName = data?.first_name && data?.first_name ? `${data?.first_name} ${data?.last_name}` : '';

  return {
    isSuccess,
    isError,
    isLoading,
    isFetching,
    data: {
      ...data,
      fullName,
    },
  };
}

export default useUserProfile;