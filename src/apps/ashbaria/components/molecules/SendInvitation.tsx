import { Button } from "@mui/material";
import { useGetMyFriendshipNetworkQuery } from "apps/ashbaria/redux/slices/FriendshipNetwork";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import React from "react";
import SMSIcon from "../atoms/icons/SMS";
import { toast } from "react-toastify";

const getInvitationText = (myCode, myFullName) => {
  return (`
سلام! من ${myFullName} هستم و تو رو دعوت می‌کنم که با راز آشباریا همراه بشی. راستی! اگه کد ${myCode} رو بزنی، جفتمون امتیاز می‌گیریم.\n
ashbaria.ir
`)
}

const SendInvitation = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const myFullName = (profile?.first_name && profile?.last_name) && `${profile.first_name} ${profile.last_name}`;
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
      toast.success('دعوت‌نامه با موفقیت کپی شد');
      navigator.clipboard.writeText(getInvitationText(myCode, myFullName))
    }
  }

  return (
    <Button startIcon={<SMSIcon />} variant='contained' size='large' onClick={handleShare} fullWidth>
      {'ارسال دعوت‌نامه'}
    </Button>
  );
}

export default SendInvitation;