import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { useNavigate, useParams } from "react-router-dom";
import ScoreChip from "apps/ashbaria/components/molecules/chips/Score";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import usePlayerPerformance from "commons/hooks/fsm/useGetPlayerPerformance";

type PropsType = {};

const PlayerPerformance: FC<PropsType> = () => {
  const fsmId = parseInt(useParams().fsmId);
  const navigate = useNavigate();
  const { data: player, isLoading: isLoadingPlayer } = useGetMyPlayerQuery({ fsmId });
  const { data: fsm, isLoading: isLoadingFSM } = useGetFSMQuery({ fsmId });
  const { correctAnswersCount, isLoading: isLoadingPlayerPerformance } = usePlayerPerformance({ playerId: parseInt(player?.id) });
  const isLoading = isLoadingPlayer || isLoadingFSM || isLoadingPlayerPerformance;

  if (!fsm) {
    return null;
  }

  return (
    <FullScreenBackgroundImage styles={{ padding: 2 }}>
      <Stack
        width={400}
        component={Paper}
        padding={2}
        paddingX={4}
        spacing={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          fontSize={24}
          fontWeight={600}
          color={'#FFA800'}
        >
          {'عملکرد شما'}
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