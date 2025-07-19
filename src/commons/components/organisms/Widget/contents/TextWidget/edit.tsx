import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import ObjectFieldsEditor from 'commons/components/organisms/object/ObjectFieldsEditor';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';

function TextEditWidget({
  onMutate,

  open,
  handleClose,
  text: oldText,
  paperId,
  id: widgetId,
  ...widgetProps
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });

  const handleClick = () => {
    onMutate({
      paper: paperId,
      text,
      widgetId,
      onSuccess: handleClose,
      ...widgetFields,
    })
  };

  return (
    <Dialog
      disableScrollLock
      fullWidth
      open={open}
      maxWidth='md'
      disableEnforceFocus
    >
      <DialogTitle>{t('text')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <DialogContentText gutterBottom>متن مورد نظر خود را وارد کنید.</DialogContentText>
            <TinyEditorComponent
              content={text}
              onChange={(text) => setText(text)}
            />
          </Stack>
          <CollapsibleTitle title='تنظیمات پیشرفته‌تر'>
            <ObjectFieldsEditor
              fields={widgetFields}
              setFields={setWidgetFields}
            />
          </CollapsibleTitle>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          {'انصراف'}
        </Button>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TextEditWidget;
