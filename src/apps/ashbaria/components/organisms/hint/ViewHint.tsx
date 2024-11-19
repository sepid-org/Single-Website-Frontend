import React, { FC } from "react";
import { Button, Stack, Paper, Typography, IconButton, Box } from "@mui/material";
import LampOnIcon from "../../atoms/icons/LampOn";
import { PublicResourceType } from "commons/types/models";
import { useGetResourceByIdQuery } from "commons/redux/apis/cms/resource/Resource";
import WidgetsPaper from "commons/template/Paper";
import FullScreenPaper from "commons/components/atoms/FullScreenPaper";
import { FSMProvider } from "commons/hooks/useFSMContext";
import { FSMStateProvider } from "commons/hooks/useFSMStateContext";
import WIDGET_REGISTRY, { WidgetRegistryType } from "commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper";
import HintAudioWidget from "../HintAudioWidget";
import FullScreenBackgroundImage from "../../molecules/FullScreenBackgroundImage";
import bg from "../../../assets/evidenceBG.svg";
import BackButton from "../../molecules/buttons/Back";
import PlayAudio from "../../molecules/buttons/PlayAudio";
import ForwardAudio from "../../molecules/buttons/ForwardAudio";
import BackwardAudio from "../../molecules/buttons/BackwardAudio";

type HintPropsType = {
  hint: PublicResourceType;
  onClose: any;
}

const ViewHint: FC<HintPropsType> = ({
  hint,
  onClose,
}) => {
  const { data: detailedHint } = useGetResourceByIdQuery({ resourceId: hint?.id }, { skip: !Boolean(hint?.id) });

  const CUSTOM_WIDGET_REGISTRY: WidgetRegistryType = {
    ...WIDGET_REGISTRY,
    Audio: {
      ...WIDGET_REGISTRY['Audio'],
      WidgetComponent: HintAudioWidget,
    },
  }

  return (
    <FullScreenBackgroundImage image={bg}>
      <Stack padding={3} spacing={2} component={FullScreenPaper} maxWidth={'xs'} position={'relative'}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Box position={'absolute'} top={12} left={30}>
            <BackButton />
          </Box>
          <Stack position={"absolute"} top={20} justifyContent={"center"} alignItems={'center'} direction={'row'} spacing={0.5}>
            <LampOnIcon />
            <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
              {"تقلب‌های اون‌ور آبی"}
              {//hont?.title
              }
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} position={"absolute"} top={50}>
          <Typography fontSize={12} fontWeight={400}>
            {"از طریق جاسوس هامون در سرزمین های آن سوی آب به ما رسیده"}
          </Typography>
          <PlayAudio />
          <ForwardAudio />
          <BackwardAudio />
        </Stack>
        <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Stack width={'100%'} spacing={2}>
            <FSMStateProvider
              fsmStateId={null}
              widgetRegistry={CUSTOM_WIDGET_REGISTRY}
            >
              <WidgetsPaper mode="general" paperId={detailedHint?.content['paper_id']} />
            </FSMStateProvider>
          </Stack>
        </Stack>
      </Stack>
    </FullScreenBackgroundImage >
  )
}

export default ViewHint;