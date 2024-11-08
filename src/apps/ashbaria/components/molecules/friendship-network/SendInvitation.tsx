import { Button } from "@mui/material";
import { useGetMyFriendshipNetworkQuery } from "apps/ashbaria/redux/slices/FriendshipNetwork";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import React from "react";
import SMSIcon from "../../atoms/icons/SMS";
import copyToClipboard from "commons/utils/CopyToClipboard";
import { toPersianNumber } from "commons/utils/translateNumber";
import useUserProfile from "commons/hooks/useUserProfile";

const getInvitationText = (myCode, myFullName) => {
  return (`
سلام! من ${myFullName} هستم و تو رو دعوت می‌کنم که با راز آشباریا همراه بشی. راستی! اگه کد ${myCode} رو بزنی، جفتمون امتیاز می‌گیریم.\n
ashbaria.ir
`)
}

const SendInvitation = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const { data: userProfile } = useUserProfile();
  const tempName = `دادبستان ${toPersianNumber(userProfile?.phone_number?.slice(-4))}`
  const myFullName = (profile?.first_name && profile?.last_name) ? `${profile.first_name} ${profile.last_name}` : tempName;
  const myCode = myFriendshipNetwork?.code.code;

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const shareOnMobile = () => {
    if (navigator.share) {
      navigator.share({
        text: getInvitationText(myCode, myFullName),
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  const handleShare = () => {
    if (isMobileDevice()) {
      shareOnMobile();
    } else {
      copyToClipboard(getInvitationText(myCode, myFullName), 'دعوت‌نامه با موفقیت کپی شد');
    }
  }

  return (
    <Button startIcon={<SMSIcon />} variant='contained' size='large' onClick={handleShare} fullWidth>
      {'ارسال دعوت‌نامه'}
    </Button>
  );
}

export default SendInvitation;