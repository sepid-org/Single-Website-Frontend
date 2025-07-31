import React, { FC } from "react";
import { useGetProgramProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Golden } from "apps/film-bazi/constants/colors";
import { toPersianNumber } from "commons/utils/translateNumber";
import useUserProfile from "commons/hooks/useUserProfile";
import hashStringToNumber from "commons/utils/hashStringToNumber";

type MyFullNamePropsType = {}

const MyFullName: FC<MyFullNamePropsType> = ({ }) => {
  const { data: myProgramProfile, isLoading } = useGetProgramProfileQuery();
  const { data: userProfile } = useUserProfile();

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={1}>
      <Box
        component="img"
        src={myProgramProfile?.profile_image}
        width={80}
        height={80}
        borderRadius={'50%'}
        sx={{
          background: 'linear-gradient(180deg, #FE9C42 100%, #E25100 100%)',
          border: '4px solid transparent', // Adjust the thickness here
        }}
      />
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        {isLoading ?
          <Skeleton variant='rounded' width={180} height={40} /> :
          <Typography noWrap fontSize={20} fontWeight={600} color={Golden}>
            {'دادبستان '}
            {(myProgramProfile?.first_name && myProgramProfile?.last_name) ?
              `${myProgramProfile.first_name} ${myProgramProfile.last_name}`
              : toPersianNumber(hashStringToNumber(userProfile.id).toString().padStart(4, '0'))
            }
          </Typography>
        }
      </Stack>
    </Stack>
  )
}

export default MyFullName;