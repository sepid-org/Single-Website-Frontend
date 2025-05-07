import { Box, Button, Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import useTransitionBackward from "commons/hooks/fsm/useTransitionBackward";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import Paper from "commons/template/Paper";
import useTransitionForward from "commons/hooks/fsm/useTransitionForward";
import { useFSMContext } from "commons/hooks/useFSMContext";
import Timer from "commons/components/molecules/Timer";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import useLocalNavigate from "../hooks/useLocalNavigate";
import useFSMState from "apps/fsm/hooks/useFSMState";

type PropsType = {};

const ExamTemplate: FC<PropsType> = () => {
  const { fsmId } = useFSMContext();
  const { player } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { fsmState: currentFSMState } = useFSMState(parseInt(player?.current_state))
  const paperId = currentFSMState?.papers?.[0];
  const { transitForward, result: transitForwardResult, canTransitForward } = useTransitionForward({ player })
  const { transitBackward, result: transitBackwardResult, canTransitBack } = useTransitionBackward({ player });
  const [finishFSM, finishFSMResult] = useFinishFSM();

  const localNavigate = useLocalNavigate();

  const handleFinishExam = () => {
    finishFSM();
  }

  useEffect(() => {
    if (finishFSMResult.isSuccess || finishFSMResult.isError) {
      localNavigate("/exam-result/");
    }
  }, [finishFSMResult.isSuccess, finishFSMResult.isError])

  return (
    <Stack
      position={'relative'}
      spacing={1}
      width={'100%'}
      height={'100%'}
      direction="column"
      alignItems="center"
    >
      <Paper mode="general" paperId={paperId} />

      <Box position='absolute' top={0} right={0}>
        <Timer
          onTimeFinish={handleFinishExam}
          duration={fsm?.duration}
          startTime={player?.started_at}
        />
      </Box>

      <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          {canTransitBack &&
            <Button
              variant="outlined"
              onClick={transitBackward}
            >
              {'سوال قبلی'}
            </Button>
          }
        </Box>
        <Box>
          {canTransitForward &&
            <Button variant="outlined" onClick={transitForward}>
              {'سوال بعدی'}
            </Button>
          }
          {
            currentFSMState?.is_end &&
            <Button variant="contained" onClick={handleFinishExam}>
              {"پایان آزمون"}
            </Button>
          }
        </Box>
      </Stack>
    </Stack>
  );
};

export default ExamTemplate;