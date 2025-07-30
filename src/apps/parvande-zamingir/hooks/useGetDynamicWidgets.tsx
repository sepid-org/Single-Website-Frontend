import React from "react";
import { ComplementaryObjectType } from "commons/types/object/object";
import ReferralCode from "../components/organisms/ReferralCode";
import RewardCodes from "../components/organisms/RewardCodes";

const useGetComplementaryWidgets = () => {

  const dynamicWidgets: ComplementaryObjectType[] = [
    {
      name: 'parvande-zamingir-referral-code',
      substituteComponent: <ReferralCode />
    },
    {
      name: 'parvande-zamingir-reward-codes',
      substituteComponent: <RewardCodes />
    },
  ];

  return {
    complementaryObjects: dynamicWidgets,
  }
}

export default useGetComplementaryWidgets;