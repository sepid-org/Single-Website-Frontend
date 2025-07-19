import { Button } from "@mui/material";
import { useGetMyFriendshipNetworkQuery } from "apps/ashbaria/redux/slices/FriendshipNetwork";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import React from "react";
import SMSIcon from "../../atoms/icons/SMS";
import { toPersianNumber } from "commons/utils/translateNumber";
import useUserProfile from "commons/hooks/useUserProfile";
import useShare from "commons/hooks/useShare";
import hashStringToNumber from "commons/utils/hashStringToNumber";

const getInvitationText = (myCode, myFullName) => {
  return (`
سلام! من ${myFullName} هستم و تو رو دعوت می‌کنم که با راز آشباریا همراه بشی. راستی! اگه کد ${myCode} رو بزنی، جفتمون امتیاز می‌گیریم.\n
ashbaria.ir
`);
}

const SendInvitation = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const { data: userProfile } = useUserProfile();
  const tempName = `دادبستان ${toPersianNumber(hashStringToNumber(userProfile.id).toString().padStart(4, '0'))}`
  const myFullName = (profile?.first_name && profile?.last_name) ? `${profile.first_name} ${profile.last_name}` : tempName;
  const myCode = myFriendshipNetwork?.code.code;

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