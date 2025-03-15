import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import usePlayerPerformance from "commons/hooks/fsm/useGetPlayerPerformance";
import ScoreChip from "commons/components/atoms/chips/Score";

type PropsType = {};

const PlayerPerformance: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const playerId = parseInt(useParams().playerId);
  const navigate = useNavigate();
  const { data: fsm, isLoading: isLoadingFSM } = useGetFSMQuery({ fsmId });
  const { correctAnswersCount, isLoading: isLoadingPlayerPerformance } = usePlayerPerformance({ playerId });
  const isLoading = isLoadingFSM || isLoadingPlayerPerformance;

  if (!fsm) {
    return null;
  }

  return (
    <FullScreenBackgroundImage styles={{ padding: 2 }}>
      <Stack
        maxWidth={'sm'}
        component={Paper}
        padding={2}
        paddingX={4}
        spacing={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography fontSize={24} fontWeight={600}>
          {'تعداد پاسخ‌های صحیح شما: '}
        </Typography>

        <ScoreChip value={correctAnswersCount} isLoading={isLoading} />

        {fsm.program_slug &&
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(`/program/${fsm.program_slug}/`)}
          >
            {'بازگشت به دوره'}
          </Button>
        }
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default PlayerPerformance;