import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import EditQuestionFields from 'commons/components/organisms/forms/EditQuestionFields';
import EditObjectFields from 'commons/components/organisms/forms/EditObject';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';
import { toPersianNumber } from 'commons/utils/translateNumber';

function SmallAnswerProblemEditWidget({
  onMutate,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  correct_answer: oldCorrectAnswer,
  paperId,
  id: widgetId,
  ...widgetProps
}) {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [correctAnswer, setCorrectAnswer] = useState<string>(oldCorrectAnswer?.text || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');
  const [widgetFields, setWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...widgetProps });

  const handleSubmit = () => {
    const body = {
      widgetId,
      paper: paperId,
      text,
      solution,
      onSuccess: handleClose,
      ...widgetFields,
    }
    if (correctAnswer) {
      body['correct_answer'] = {
        text: correctAnswer,
        answer_type: 'SmallAnswer',
      }
    }
    onMutate(body);
  };

  return (
    <Dialog
      disableScrollLock
      open={open}
      maxWidth="md"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{`سوال کوتاه‌پاسخ ${widgetId ? ` ${toPersianNumber(widgetId)}#` : ''}`}</DialogTitle>
      <DialogContent>
        <CollapsibleTitle title='مشخصات شئ'>
          <EditObjectFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
        </CollapsibleTitle>
        <Stack spacing={1} alignItems={'start'}>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent
            content={text}
            onChange={(text) => setText(text)}
          />
          <label>{'پاسخ صحیح'}</label>
          <TextField
            variant='outlined'
            fullWidth
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
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
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default SmallAnswerProblemEditWidget;
