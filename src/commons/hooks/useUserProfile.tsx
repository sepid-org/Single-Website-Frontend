import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "apps/website-display/redux/features/party/ProfileSlice";

const useUserProfile = () => {
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });
  const fullName = `${userProfile?.first_name} ${userProfile?.last_name}`;

  return {
    fullName,
    ...userProfile
  };
}

export default useUserProfile;