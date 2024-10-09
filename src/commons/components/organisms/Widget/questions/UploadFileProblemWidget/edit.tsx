import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'commons/components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import EditQuestionFields from 'commons/components/organisms/forms/EditQuestionFields';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';

type UploadFileProblemEditWidgetPropsType = {
  onMutate: any;
  handleClose: any;

  open: boolean;
  text: string;
  paperId: string;
  id: number;
  solution: string;
}

const UploadFileProblemEditWidget: FC<UploadFileProblemEditWidgetPropsType> = ({
  onMutate,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  paperId,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [text, setText] = useState(oldText || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');
  const [widgetFields, setWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...widgetProps });

  const handleSubmit = () => {
    onMutate({
      paper: paperId,
      text: text,
      widgetId,
      solution,
      onSuccess: handleClose,
      ...widgetFields
    });
  };

  return (
    <Dialog disableScrollLock open={open} maxWidth='md'>
      <DialogTitle>{'ارسال فایل'}</DialogTitle>
      <DialogContent>
        <EditObjectFields
          fields={widgetFields}
          setFields={setWidgetFields}
        />
        <Stack spacing={1} alignItems={'start'}>
          <Typography>
            متن درخواستی را که برای ارسال فایل دارید، در قسمت زیر وارد کنید.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            value={text}
            placeholder="مثال: لطفا فایل جواب را ارسال کنید."
            onChange={(e) => setText(e.target.value)}
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
    </Dialog>
  );
}

export default UploadFileProblemEditWidget;
