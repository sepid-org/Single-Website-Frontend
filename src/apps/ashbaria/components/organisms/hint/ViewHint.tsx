import React, { FC } from "react";
import { Button, Stack, Paper, Typography, IconButton, Box } from "@mui/material";
import LampOnIcon from "../../atoms/icons/LampOn";
import { PublicResourceType } from "commons/types/models";
import { useGetResourceByIdQuery } from "commons/redux/apis/cms/resource/Resource";
import WidgetsPaper from "commons/template/Paper";
import FullScreenPaper from "commons/components/atoms/FullScreenPaper";
import ArrowRightIcon from "../../atoms/icons/ArrowRight";

type HintPropsType = {
  hint: PublicResourceType;
  onClose: any;
}

const ViewHint: FC<HintPropsType> = ({
  hint,
  onClose,
}) => {
  const { data: detailedHint } = useGetResourceByIdQuery({ resourceId: hint?.id }, { skip: !Boolean(hint?.id) });

  return (
    <Stack padding={3} spacing={2} component={FullScreenPaper} maxWidth={'xs'} position={'relative'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <Box position={'absolute'} top={8} left={8}>
          <IconButton onClick={onClose}>
            <ArrowRightIcon />
          </IconButton>
        </Box>
        <Stack alignItems={'center'} direction={'row'} spacing={0.5}>
          <LampOnIcon />
          <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
            {hint?.title}
          </Typography>
        </Stack>
      </Stack>
      <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Stack width={'100%'} spacing={2}>
          <WidgetsPaper mode="general" paperId={detailedHint?.content['paper_id']} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ViewHint;