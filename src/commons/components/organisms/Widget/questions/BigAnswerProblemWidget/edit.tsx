import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import EditQuestionFields from 'commons/components/organisms/forms/EditQuestionFields';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';

type BigAnswerProblemEditWidgetPropsType = {
  handleClose: any;
  onMutate: any;

  open: boolean;
  text: string;
  solution: any;
  paperId: string;
  id: string;
  is_required?: boolean;
}

const BigAnswerProblemEditWidget: FC<BigAnswerProblemEditWidgetPropsType> = ({
  handleClose,
  onMutate,

  open,
  text: oldText,
  solution: previousSolution,
  paperId,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [solution, setSolution] = useState<string>(previousSolution || '');
  const [widgetFields, setWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...widgetProps });

  const handleClick = () => {
    onMutate({
      widgetId,
      paper: paperId,
      text: text,
      solution,
      onSuccess: handleClose,
      ...widgetFields,
    })
  };

  return (
    <Dialog
      disableScrollLock
      open={open}
      maxWidth="md"
      fullWidth
      scroll="body"
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{'سوال تشریحی'}</DialogTitle>
      <DialogContent>
        <Stack alignItems={'start'} spacing={1}>
          <label>{'صورت سوال'}</label>
          <EditObjectFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
          <TinyEditorComponent
            content={text}
            onChange={(val: string) => setText(val)}
          />
          <label>{'راه‌حل'}</label>
          <TinyEditorComponent
            content={solution}
            onChange={(val: string) => setSolution(val)}
          />
          <EditQuestionFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BigAnswerProblemEditWidget;
