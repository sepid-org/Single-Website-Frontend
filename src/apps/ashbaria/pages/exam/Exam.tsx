import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import FullScreenPaper from "commons/components/atoms/FullScreenPaper";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import useChangeState from "commons/hooks/useChangeState";
import useTransitionBack from "commons/hooks/useTransitionBack";
import useFinishFSM from "commons/hooks/useFinishFSM";

type ExamPagePropsType = {};

const ExamPage: FC<ExamPagePropsType> = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? "4" : "213";
  const { data: player } = useGetMyPlayerQuery({ fsmId });
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player.current_state) })
  const [changeState, changeStateResult] = useChangeState();
  const [transitBack, transitBackResult] = useTransitionBack({ playerId: player?.id })
  const [finishFSM, finishFSMResult] = useFinishFSM();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack component={FullScreenPaper} padding={2} spacing={2} justifyContent={'space-between'}>
        {/* todo */}
      </Stack>
    </Box>
  );
};

export default ExamPage;
