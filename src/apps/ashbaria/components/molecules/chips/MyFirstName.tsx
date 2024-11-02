import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Stack, Typography } from "@mui/material";
import { Golden } from "apps/ashbaria/constants/colors";

type MyFirstNamePropsType = {}

const MyFirstName: FC<MyFirstNamePropsType> = ({ }) => {
  const { data: myProfile } = useGetProfileQuery();

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
      <Box
        component="img"
        src={myProfile?.profile_image}
        width={40}
        height={40}
        borderRadius={'50%'}
        sx={{
          background: 'linear-gradient(180deg, #FE9C42 0%, #E25100 100%)',
          border: '2px solid transparent', // Adjust the thickness here
        }}
      />
      <Typography noWrap fontSize={16} fontWeight={600} textAlign={'center'}>
        {myProfile?.first_name || 'بی‌نام'}
      </Typography>
    </Stack >
  )
}

export default MyFirstName;