import { useGetCurrentUserProfileQuery } from "commons/redux/apis/party/ProfileSlice";
import { useMemo } from "react";

const useUserProfile = () => {
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetCurrentUserProfileQuery();

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