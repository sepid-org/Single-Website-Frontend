import { Box, Paper } from '@mui/material';
import React, { FC, useMemo } from 'react';

import WidgetHint from 'commons/components/molecules/WidgetHint';
import useWidgetFactory from './useWidgetFactory';
import { AnswerType } from 'commons/types/models';
import { WidgetType } from 'commons/types/widgets/widget';
import CollapseWidgetEditMenu from './CollapseWidgetEditMenu';

export enum WidgetModes {
  Create,
  View,
  Edit,
  Review,
  InForm,
};

export enum WidgetTypes {
  SmallAnswerProblem = 'SmallAnswerProblem',
  BigAnswerProblem = 'BigAnswerProblem',
  UploadFileProblem = 'UploadFileProblem',
  MultiChoiceProblem = 'MultiChoiceProblem',
  InviteeUsername = 'InviteeUsername',
  TextWidget = 'TextWidget',
  DetailBoxWidget = 'DetailBoxWidget',
  Image = 'Image',
  Video = 'Video',
  Iframe = 'Iframe',
}

type WidgetPropsType = {
  widget: WidgetType;
  mode?: WidgetModes;
  paperId: string;
  coveredWithPaper?: boolean;
  collectAnswer?: any;
  submittedAnswer?: AnswerType;
}

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  coveredWithPaper = true,
  collectAnswer,
  submittedAnswer,
}) => {

  const {
    onAnswerChange,
    onAnswerSubmit,
    WidgetComponent,
  } = useWidgetFactory({
    widgetId: widget.id.toString(),
    paperId,
    widgetType: widget.widget_type,
    collectAnswer,
  });

  const Cover = useMemo(() =>
    coveredWithPaper
      ? ({ children }) =>
        <Paper elevation={2} sx={{ padding: 1, width: '100%', height: '100%', position: 'relative' }}>
          {children}
        </Paper>
      : ({ children }) =>
        <Box position={'relative'}>
          {children}
        </Box>
    , [coveredWithPaper])

  return (
    <Cover>
      {mode === WidgetModes.Edit &&
        <CollapseWidgetEditMenu widget={widget} paperId={paperId} />
      }
      {(mode === WidgetModes.View && widget?.hints?.length) ? <WidgetHint hints={widget.hints} /> : null}
      <WidgetComponent
        {...widget}
        mode={mode}
        submittedAnswer={submittedAnswer}
        onAnswerSubmit={onAnswerSubmit}
        onAnswerChange={onAnswerChange}
      />
    </Cover>
  );
};

export default Widget;
