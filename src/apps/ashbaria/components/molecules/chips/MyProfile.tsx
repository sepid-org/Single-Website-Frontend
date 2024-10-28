import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Stack, Typography } from "@mui/material";
import { Gold } from "apps/ashbaria/constants/colors";

type MyProfilePropsType = {}

const MyProfile: FC<MyProfilePropsType> = ({ }) => {
  const { data: myProfile } = useGetProfileQuery();

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
      <Typography noWrap maxWidth={180} fontSize={20} fontWeight={600} color={Gold}>
        {(myProfile?.first_name && myProfile?.first_name) ?
          `${myProfile.first_name} ${myProfile.last_name}`
          : 'بی‌نام بی‌نام‌زاده'
        }
      </Typography>
    </Stack>
  )
}

export default MyProfile;