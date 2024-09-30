import { Box, Paper } from '@mui/material';
import React, { FC, Fragment, useMemo, useState } from 'react';

import WidgetHint from 'commons/components/molecules/WidgetHint';
import useWidgetFactory from './useWidgetFactory';
import CostDialog from '../dialogs/CostDialog';
import { AnswerType } from 'commons/types/models';
import { WidgetType } from 'commons/types/widgets/widget';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import WidgetSettingMenu from './WidgetEditMenu';
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
  const [showCostDialog, setShowCostDialog] = useState(false);
  const [answerBody, setAnswerBody] = useState({});

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

  const beCorrected = (widget as QuestionWidgetType).be_corrected;
  const cost = null; // widget.cost;
  const reward = null; // widget.reward;

  const onSubmit = () => {
    onAnswerSubmit({ ...answerBody, onSuccess: () => setShowCostDialog(showCostDialog => !showCostDialog) });
  }

  let onAnswerSubmitWrapper;
  if (beCorrected && cost) {
    onAnswerSubmitWrapper = (body) => {
      setShowCostDialog(showCostDialog => !showCostDialog);
      setAnswerBody(body);
    }
  }

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
    <Fragment>
      <Cover>
        {mode === WidgetModes.Edit &&
          <CollapseWidgetEditMenu widget={widget} paperId={paperId} />
        }
        {(mode === WidgetModes.View && widget?.hints?.length) ? <WidgetHint hints={widget.hints} /> : null}
        <WidgetComponent submittedAnswer={submittedAnswer} {...widget} mode={mode} onAnswerSubmit={onAnswerSubmitWrapper || onAnswerSubmit} onAnswerChange={onAnswerChange} />
      </Cover>
      {cost &&
        <CostDialog
          cost={cost}
          callBackFunction={onSubmit}
          open={showCostDialog}
          handleClose={() => setShowCostDialog(showCostDialog => !showCostDialog)}
        />
      }
    </Fragment>
  );
};

export default Widget;
