import { Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useStartFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useFSMContext } from "commons/hooks/useFSMContext";

type PropsType = {};

const FSMStartPage: FC<PropsType> = () => {
  const { fsmId } = useFSMContext();
  const navigate = useNavigate();
  const [startFSM] = useStartFSMMutation();
  const { data: fsm, isLoading: isFSMLoading } = useGetFSMQuery({ fsmId });
  const { data: userFSMsStatus, isLoading: isUserFSMsLoading } = useGetProgramUserFSMsStatusQuery({ programSlug: fsm?.program_slug }, { skip: !fsm?.program_slug });
  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];
  const remainingParticipations = fsm?.participant_limit - userCurrentFSM?.finished_players_count;
  const canStartFSM = fsm?.participant_limit === 0 || remainingParticipations > 0;
  const isLoading = isUserFSMsLoading || isFSMLoading;

  return (
    <FullScreenBackgroundImage styles={{ padding: 2 }}>
      <Stack
        width={{ xs: '100%', sm: 400 }}
        padding={2}
        paddingX={4}
        spacing={1}
        alignItems={'center'}
        justifyContent={'center'}
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
              {fsm?.name}
            </Typography>
            <Typography
              align="center"
              fontWeight={400}
              fontSize={16}
            >
              {fsm?.description}
            </Typography>
            {!canStartFSM &&
              <Typography
                paddingTop={1}
                align="center"
                fontWeight={400}
                fontSize={12}
              >
                {`تعداد دفعات مجاز شما برای شرکت در ${fsm?.name} به پایان رسیده است 😔`}
              </Typography>
            }
            <Button
              fullWidth
              variant="contained"
              disabled={isLoading || !canStartFSM}
              onClick={() => startFSM({ fsmId })}
            >
              {'شروع'}
            </Button>
            {fsm?.program_slug ?
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(`/program/${fsm.program_slug}/`)}
              >
                {'بازگشت به دوره'}
              </Button> :
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/')}
              >
                {'بازگشت به خانه'}
              </Button>
            }
          </>
        )}
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default FSMStartPage;
