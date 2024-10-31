import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Golden } from "apps/film-bazi/constants/colors";

type MyFullNamePropsType = {}

const MyFullName: FC<MyFullNamePropsType> = ({ }) => {
  const { data: myProfile, isLoading } = useGetProfileQuery();

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={1}>
      <Box
        component="img"
        src={myProfile?.profile_image}
        width={80}
        height={80}
        borderRadius={'50%'}
        sx={{
          background: 'linear-gradient(180deg, #FE9C42 0%, #E25100 100%)',
          border: '4px solid transparent', // Adjust the thickness here
        }}
      />
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        {isLoading ?
          <Skeleton variant='rounded' width={180} height={40} /> :
          <Typography noWrap fontSize={20} fontWeight={600} color={Golden}>
            {'دادبستان '}
            {(myProfile?.first_name && myProfile?.first_name) ?
              `${myProfile.first_name} ${myProfile.last_name}`
              : 'بی‌نام بی‌نام‌زاده'
            }
          </Typography>
        }
      </Stack>
    </Stack>
  )
}

export default MyFullName;