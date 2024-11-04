import { Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import React, { FC } from "react";
import { Secondary } from "apps/ashbaria/constants/colors";
import LockIcon from "apps/ashbaria/components/atoms/icons/Lock";

type PropsType = {
  court: CourtType;
}

const LockedCourtCard: FC<PropsType> = ({
  court,
}) => {

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} spacing={1} padding={1}>
      <Typography fontSize={10} fontWeight={400} color={Secondary} textAlign={'center'}>
        {'دادگاه'}
      </Typography>
      <Typography fontSize={12} fontWeight={600} color={Secondary} textAlign={'center'}>
        {court.title}
      </Typography>
      <LockIcon />
    </Stack>
  );
}

export default LockedCourtCard;