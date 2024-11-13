import { Box, Button, Stack } from "@mui/material";
import React, { FC } from "react";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import useTransitionBackward from "commons/hooks/fsm/useTransitionBackward";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import Paper from "commons/template/Paper";
import useTransitionForward from "commons/hooks/fsm/useTransitionForward";
import { useFSMContext } from "commons/hooks/useFSMContext";
import ExamTimer from "../components/molecules/ExamTimer";

type PropsType = {};

const ExamTemplate: FC<PropsType> = () => {
  const { fsmId } = useFSMContext();
  const { player } = useFSMContext();
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })
  const paperId = currentFSMState?.papers?.[0];
  const { transitForward, result: transitForwardResult, canTransitForward } = useTransitionForward({ player })
  const { transitBackward, result: transitBackwardResult, canTransitBack } = useTransitionBackward({ player });
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId });

  return (
    <Stack>
      <Box position="relative">
        <Paper mode="general" paperId={paperId} />
        <Box position="absolute" top={800} left={800} zIndex={1}>
          <ExamTimer />
        </Box>
      </Box>
      <Button onClick={() => transitBackward()}>
        {'back'}
      </Button>
      <Button onClick={() => transitForward()}>
        {'next'}
      </Button>
    </Stack>
  );
};

export default ExamTemplate;
