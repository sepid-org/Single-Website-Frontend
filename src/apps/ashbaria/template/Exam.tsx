import { Button, Stack } from "@mui/material";
import React, { FC } from "react";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import useTransitionBack from "commons/hooks/fsm/useTransitionBack";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import Paper from "commons/template/Paper";
import useTransitionForward from "commons/hooks/fsm/useTransitionForward";
import { useFSMStateContext } from "commons/hooks/useFSMStateContext";
import { useFSMContext } from "commons/hooks/useFSMContext";

type PropsType = {};

const ExamTemplate: FC<PropsType> = () => {
  const { fsmId } = useFSMContext();
  const { player } = useFSMStateContext();
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })
  const paperId = currentFSMState?.papers?.[0];
  const [transitForward, transitForwardResult] = useTransitionForward({ player })
  const [transitBack, transitBackResult] = useTransitionBack({ player });
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId });

  return (
    <Stack>
      <Paper mode='general' paperId={paperId} />
      <Button onClick={() => transitBack()}>
        {'back'}
      </Button>
      <Button onClick={() => transitForward()}>
        {'next'}
      </Button>
    </Stack>
  );
};

export default ExamTemplate;
