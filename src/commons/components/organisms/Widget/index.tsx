import { Box } from '@mui/material';
import React, { FC } from 'react';

import WidgetHintsButton from 'commons/components/molecules/buttons/WidgetHints';
import useWidgetFactory from './useWidgetFactory';
import { AnswerType } from 'commons/types/models';
import { WidgetType } from 'commons/types/widgets/widget';
import CollapseWidgetEditMenu from './CollapseWidgetEditMenu';
import ScaleFont from './ScaleFont';

export enum WidgetModes {
  Create,
  View,
  Edit,
  Review,
  InForm,
  Disable,
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
  collectAnswer?: any;
  submittedAnswer?: AnswerType;
};

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  collectAnswer,
  submittedAnswer,
}) => {

  const {
    onAnswerChange,
    useSubmitAnswerMutation,
    WidgetComponent,
  } = useWidgetFactory({
    widgetId: widget.id,
    paperId,
    widgetType: widget.widget_type,
    collectAnswer,
  });

  return (
    <Box
      width="100%"
      height="100%"
      position="relative"
    >
      {mode === WidgetModes.Edit && (
        <CollapseWidgetEditMenu widget={widget} paperId={paperId} />
      )}

      {mode === WidgetModes.View && widget?.hints?.length > 0 && (
        <WidgetHintsButton widgetId={widget.id} />
      )}
      <ScaleFont fontScale={widget.font_scale || 1}>
        <WidgetComponent
          {...widget}
          mode={mode}
          paperId={paperId}
          submittedAnswer={submittedAnswer}
          useSubmitAnswerMutation={useSubmitAnswerMutation}
          onAnswerChange={onAnswerChange}
        />
      </ScaleFont>
    </Box>
  );
};

export default Widget;