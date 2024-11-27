import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Skeleton, Stack } from "@mui/material";
import MyFirstName from "../../atoms/MyFirstName";

type PropsType = {};

const MyFirstNameChip: FC<PropsType> = ({ }) => {
  const { data: myAshbariaProfile, isLoading } = useGetProfileQuery();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={1}
      sx={{
        backgroundColor: '#00000066',
        padding: 1,
        borderRadius: 2,
      }}
    >
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Box
          component="img"
          src={myAshbariaProfile?.profile_image}
          width={44}
          height={44}
          borderRadius="50%"
          sx={{
            background: 'linear-gradient(180deg, #FE9C42 100%, #E25100 100%)',
            border: '3px solid transparent',
          }}
        />
      )}
      <MyFirstName />
    </Stack>
  );
};

export default MyFirstNameChip;
