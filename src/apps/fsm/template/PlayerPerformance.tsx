import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import usePlayerPerformance from "commons/hooks/fsm/useGetPlayerPerformance";
import ScoreChip from "commons/components/atoms/chips/Score";
import { useFSMContext } from "commons/hooks/useFSMContext";

type PropsType = {
  playerId: number;
};

const PlayerPerformance: FC<PropsType> = ({ playerId }) => {
  const { fsmId } = useFSMContext();
  const { data: fsm, isLoading: isLoadingFSM } = useGetFSMQuery({ fsmId });
  const { correct, isLoading: isLoadingPlayerPerformance } = usePlayerPerformance({ playerId });
  const isLoading = isLoadingFSM || isLoadingPlayerPerformance;

  if (!fsm) {
    return null;
  }

  return (
    <Stack
      maxWidth={'sm'}
      spacing={1}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography fontSize={24} fontWeight={600}>
        {'تعداد پاسخ‌های صحیح شما: '}
      </Typography>
      <ScoreChip value={correct} isLoading={isLoading} />
    </Stack>
  );
};

export default PlayerPerformance;