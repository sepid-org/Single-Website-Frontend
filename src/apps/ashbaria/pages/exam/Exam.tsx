import { Paper, Stack, styled } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/examBG.svg";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { FSMStateProvider } from "commons/hooks/useFSMStateContext";
import WIDGET_REGISTRY, { WidgetRegistryType } from "commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper";
import ExamQuestion from "apps/ashbaria/components/organisms/ExamQuestion";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { FSMProvider } from "commons/hooks/useFSMContext";
import ExamTemplate from "../../template/Exam";

const FullScreenPaper = styled(Paper)(({ theme }) => ({
  width: `calc(100vw - ${theme.spacing(4)})`,
  height: `calc(100vh - ${theme.spacing(4)})`,
  maxWidth: 'none',
  maxHeight: 'none',
}));

type ExamPagePropsType = {};

const ExamPage: FC<ExamPagePropsType> = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;
  const { data: player } = useGetMyPlayerQuery({ fsmId });

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    MultiChoiceProblem: {
      ...WIDGET_REGISTRY['MultiChoiceProblem'],
      WidgetComponent: ExamQuestion,
    },
  };

  return (
    <FullScreenBackgroundImage image={backgroundImg} styles={{ padding: 2 }}>
      <Stack component={FullScreenPaper} padding={2} spacing={2} justifyContent={'space-between'}>
        <FSMProvider
          fsmId={fsmId}
          player={player}
        >
          <FSMStateProvider
            fsmStateId={player?.current_state}
            widgetRegistry={CUSTOM_WIDGET_REGISTRY}
          >
            <ExamTemplate />
          </FSMStateProvider>
        </FSMProvider>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default ExamPage;