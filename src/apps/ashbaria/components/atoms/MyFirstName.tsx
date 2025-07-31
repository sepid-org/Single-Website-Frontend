import React, { FC, Fragment } from "react";
import { useGetProgramProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Skeleton, Typography } from "@mui/material";
import useUserProfile from "commons/hooks/useUserProfile";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";

type PropsType = {}

const MyFirstName: FC<PropsType> = ({ }) => {
  const { data: myProgramProfile, isLoading } = useGetProgramProfileQuery();
  const { data: userProfile } = useUserProfile();

  return (
    <Fragment>
      {isLoading ?
        <Skeleton variant='rounded' width={80} height={36} /> :
        <Typography noWrap fontSize={18} fontWeight={600} textAlign={'center'}>
          {myProgramProfile?.first_name || `دادبستان ${toPersianNumber(hashStringToNumber(userProfile.id).toString().padStart(4, '0'))}`}
        </Typography>
      }
    </Fragment>
  )
}

export default MyFirstName;