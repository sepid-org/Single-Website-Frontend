import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import useUserProfile from "commons/hooks/useUserProfile";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";

type PropsType = {}

const MyFirstNameChip: FC<PropsType> = ({ }) => {
  const { data: myAshbariaProfile, isLoading } = useGetProfileQuery();
  const { data: userProfile } = useUserProfile();

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      direction={'row'}
      spacing={0.5}
      sx={{
        backgroundColor: '#00000066'
      }}
      padding={1}
      borderRadius={2}
    >
      {isLoading ?
        <Skeleton variant='circular' width={40} height={40} /> :
        <Box
          component="img"
          src={myAshbariaProfile?.profile_image}
          width={40}
          height={40}
          borderRadius={'50%'}
          sx={{
            background: 'linear-gradient(180deg, #FE9C42 0%, #E25100 100%)',
            border: '2px solid transparent',
          }}
        />
      }
      {isLoading ?
        <Skeleton variant='rounded' width={80} height={36} /> :
        <Typography noWrap fontSize={16} fontWeight={600} textAlign={'center'}>
          {myAshbariaProfile?.first_name || `دادبستان ${toPersianNumber(hashStringToNumber(userProfile.id).toString().padStart(4, '0'))}`}
        </Typography>
      }
    </Stack >
  )
}

export default MyFirstNameChip;