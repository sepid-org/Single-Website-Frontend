import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import FileUploadButton from 'commons/components/molecules/UploadFileButton';
import EditObjectFields from 'commons/components/organisms/forms/EditObject';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';

const ImageEditWidget = ({
  onMutate,
  handleClose,

  paperId,
  open,
  link: previousLink,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [link, setLink] = useState<string>(previousLink || '');
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });

  const handleClick = () => {
    onMutate({
      paper: paperId,
      link,
      widgetId,
      onSuccess: handleClose,
      ...widgetFields,
    })
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{t('image')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <CollapsibleTitle title='مشخصات شئ'>
            <EditObjectFields
              fields={widgetFields}
              setFields={setWidgetFields}
            />
          </CollapsibleTitle>
          <FileUploadButton setFileLink={setLink} />
          <Divider>یا</Divider>
          <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
          <TextField
            fullWidth
            label="آدرس تصویر"
            value={link}
            inputProps={{ dir: 'ltr' }}
            placeholder="http://example.com/example.png"
            onChange={(e) => setLink(e.target.value)}
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

export default ImageEditWidget;
