import { Box, Button, Container, Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import useTransitionBackward from "commons/hooks/fsm/useTransitionBackward";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import Paper from "commons/template/Paper";
import useTransitionForward from "commons/hooks/fsm/useTransitionForward";
import { useFSMContext } from "commons/hooks/useFSMContext";
import ExamTimer from "../components/molecules/ExamTimer";
import { useNavigate } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import useLocalNavigate from "../hooks/useLocalNavigate";

type PropsType = {};

const ExamTemplate: FC<PropsType> = () => {
  const { fsmId } = useFSMContext();
  const { player } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })
  const paperId = currentFSMState?.papers?.[0];
  const { transitForward, result: transitForwardResult, canTransitForward } = useTransitionForward({ player })
  const { transitBackward, result: transitBackwardResult, canTransitBack } = useTransitionBackward({ player });
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId, navigateAfter: false });

  const localNavigate = useLocalNavigate();

  const handleFinishExam = () => {
    finishFSM();
  }

  useEffect(() => {
    if (finishFSMResult?.isSuccess) {
      localNavigate("/exam-result/");
    }
  }, [finishFSMResult])

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
        position: 'relative'
      }}
    >
      <Paper mode="general" paperId={paperId} />
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}>
        {/* <ExamTimer
          handleTimeFinish={handleFinishExam}
          duration={fsm?.duration}
          started_at={player?.started_at}
        /> */}
      </Box>
      <Box sx={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        display: 'flex',
        gap: 1,
      }}>
        {canTransitBack &&
          <Button
            variant="outlined"
            onClick={transitBackward}
          >
            {'سوال قبلی'}
          </Button>
        }
      </Box>
      <Box sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        display: 'flex',
        gap: 1,
      }}>
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
  );
};

export default ExamTemplate;