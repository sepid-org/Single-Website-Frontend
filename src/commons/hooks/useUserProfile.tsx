import { useGetUserProfileQuery } from "commons/redux/apis/party/ProfileSlice";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const useUserProfile = () => {
  const userInfo = useSelector((state: any) => state.account.userInfo);

  const {
    data,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetUserProfileQuery({ userId: userInfo.id });

  const fullName = useMemo(() => {
    return data?.first_name && data?.last_name ? `${data.first_name} ${data.last_name}` : '';
  }, [data?.first_name, data?.last_name]);

  const memoizedData = useMemo(() => {
    return {
      ...data,
      fullName,
    };
  }, [data, fullName]);

  return useMemo(() => {
    return {
      isSuccess,
      isError,
      isLoading,
      isFetching,
      data: memoizedData,
    };
  }, [isSuccess, isError, isLoading, isFetching, memoizedData]);
};

export default useUserProfile;