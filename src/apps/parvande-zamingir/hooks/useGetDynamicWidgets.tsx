import ReferralCode from "../components/organisms/ReferralCode";
import RewardCodes from "../components/organisms/RewardCodes";
import { DynamicObjectsType } from "commons/types/object/object";

const useGetDynamicsWidgets = () => {

  const dynamicWidgets: DynamicObjectsType = {
    'parvande-zamingir-referral-code': ReferralCode,
    'parvande-zamingir-reward-codes': RewardCodes,
  };

  return {
    dynamicWidgets,
  }
}

export default useGetDynamicsWidgets;