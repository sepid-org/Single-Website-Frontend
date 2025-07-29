import { Button } from "@mui/material";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import React from "react";
import SMSIcon from "../../atoms/icons/SMS";
import { toPersianNumber } from "commons/utils/translateNumber";
import useUserProfile from "commons/hooks/useUserProfile";
import useShare from "commons/hooks/useShare";
import hashStringToNumber from "commons/utils/hashStringToNumber";
import { useGetMyMembershipQuery } from "commons/redux/apis/incentive-service/Network";
import { ASHBARIA_NETWORK_ID } from "apps/ashbaria/constants/game-info";

const getInvitationText = (myCode, myFullName) => {
  return (`
سلام! من ${myFullName} هستم و تو رو دعوت می‌کنم که با راز آشباریا همراه بشی. راستی! اگه کد ${myCode} رو بزنی، جفتمون امتیاز می‌گیریم.\n
ashbaria.ir
`);
}

const SendInvitation = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: myMembership } = useGetMyMembershipQuery({ networkId: ASHBARIA_NETWORK_ID });
  const { data: userProfile } = useUserProfile();
  const tempName = `دادبستان ${toPersianNumber(hashStringToNumber(userProfile.id).toString().padStart(4, '0'))}`
  const myFullName = (profile?.first_name && profile?.last_name) ? `${profile.first_name} ${profile.last_name}` : tempName;
  const myCode = myMembership?.code;

  const { share } = useShare();

  const handleShare = () => {
    share(getInvitationText(myCode, myFullName), 'دعوت‌نامه با موفقیت کپی شد');
  }

  return (
    <Button startIcon={<SMSIcon />} variant='contained' size='large' onClick={handleShare} fullWidth>
      {'ارسال دعوت‌نامه'}
    </Button>
  );
}

export default SendInvitation;