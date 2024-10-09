import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "apps/website-display/redux/features/party/ProfileSlice";

const useUserProfile = () => {
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetUserProfileQuery({ userId: userInfo.id });
  const fullName = `${data?.first_name} ${data?.last_name}`;

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