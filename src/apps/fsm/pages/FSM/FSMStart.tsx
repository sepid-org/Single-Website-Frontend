import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";

type PropsType = {};

const FSMStart: FC<PropsType> = () => {
  const fsmId = parseInt(useParams().fsmId);
  const navigate = useNavigate();
  const [startFSM, startFSMResult] = useStartFSM({ fsmId });
  const { data: fsm, isLoading: isFSMLoading } = useGetFSMQuery({ fsmId });
  const { data: userFSMsStatus, isLoading: isUserFSMsLoading } = useGetProgramUserFSMsStatusQuery({ programSlug: fsm?.program_slug }, { skip: !fsm?.program_slug });
  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];
  const remainingParticipations = fsm?.participant_limit - userCurrentFSM?.finished_players_count;
  const canStartFSM = fsm?.participant_limit === 0 || remainingParticipations > 0;
  const isLoading = isUserFSMsLoading || isFSMLoading;

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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Stack spacing={2} width="100%" alignItems={'center'} justifyContent={'center'}>
            <Skeleton variant="rounded" width="60%" height={40} />
            <Skeleton variant="rounded" width="40%" height={30} />
            <Skeleton variant="rounded" width="100%" height={40} />
            <Skeleton variant="rounded" width="100%" height={30} />
          </Stack>
        ) : (
          <>
            <Typography fontWeight={600} fontSize={24}>
              {fsm.name}
            </Typography>
            <Typography
              align="center"
              fontWeight={400}
              fontSize={16}
            >
              {fsm.description}
            </Typography>
            <Typography
              align="center"
              fontWeight={400}
              fontSize={16}
            >
              {!canStartFSM && 'فرصتی باقی نمانده :('}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={isLoading || !canStartFSM}
              onClick={() => startFSM({})}
            >
              {'شروع'}
            </Button>
            {fsm.program_slug &&
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(`/program/${fsm.program_slug}/`)}
              >
                {'بازگشت به دوره'}
              </Button>
            }
          </>
        )}
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default FSMStart;
