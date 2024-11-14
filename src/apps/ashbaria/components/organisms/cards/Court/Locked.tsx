import { Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import React, { FC } from "react";
import { DarkSecondary } from "apps/ashbaria/constants/colors";
import DarkLockIcon from "apps/ashbaria/components/atoms/icons/DarkLock";

type PropsType = {
  court: CourtType;
}

const LockedCourtCard: FC<PropsType> = ({
  court,
}) => {

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} spacing={1} padding={1}>
      <Typography fontSize={10} fontWeight={400} color={DarkSecondary} textAlign={'center'}>
        {'دادگاه'}
      </Typography>
      <Typography fontSize={12} fontWeight={600} color={DarkSecondary} textAlign={'center'}>
        {court.title}
      </Typography>
      <DarkLockIcon />
    </Stack>
  );
}

export default LockedCourtCard;