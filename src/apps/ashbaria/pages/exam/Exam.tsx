import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import FullScreenPaper from "commons/components/atoms/FullScreenPaper";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import useChangeState from "commons/hooks/useChangeState";
import useTransitionBack from "commons/hooks/useTransitionBack";
import useFinishFSM from "commons/hooks/useFinishFSM";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { FSMStateProvider } from "commons/hooks/useFSMStateContext";
import Paper from "commons/template/Paper";
import WIDGET_REGISTRY, { WidgetRegistryType } from "commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper";
import ExamQuestion from "apps/ashbaria/components/organisms/ExamQuestion";

type ExamPagePropsType = {};

const ExamPage: FC<ExamPagePropsType> = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? "7" : "213";
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: player } = useGetMyPlayerQuery({ fsmId });
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })
  const paperId = currentFSMState?.papers?.[0];
  const [changeState, changeStateResult] = useChangeState();
  const [transitBack, transitBackResult] = useTransitionBack({ playerId: player?.id });
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId });

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    MultiChoiceProblem: {
      ...WIDGET_REGISTRY['MultiChoiceProblem'],
      WidgetComponent: ExamQuestion,
    },
  }

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
        <FSMStateProvider
          fsmStateId={player?.current_state}
          widgetRegistry={CUSTOM_WIDGET_REGISTRY}
        >
          <Paper mode='general' paperId={paperId} />
        </FSMStateProvider>
      </Stack>
    </Box>
  );
};

export default ExamPage;
