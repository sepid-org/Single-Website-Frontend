import React, { FC } from "react";
import { useGetProfileQuery } from "apps/ashbaria/redux/slices/Profile";
import { Box, Skeleton, Stack, ButtonBase } from "@mui/material";
import MyFirstName from "../../atoms/MyFirstName";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

type PropsType = {};

const MyFirstNameChip: FC<PropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { data: myAshbariaProfile, isLoading } = useGetProfileQuery();

  return (
    <ButtonBase onClick={() => localNavigate('/profile/')} sx={{ borderRadius: 2 }}>
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
              background: 'linear-gradient(180deg, #FE9C42 0%, #E25100 100%)',
              border: '3px solid transparent',
            }}
          />
        )}
        <MyFirstName />
      </Stack>
    </ButtonBase>
  );
};

export default MyFirstNameChip;
