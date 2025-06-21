import {
  Button,
  Dialog,
  Divider,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
  Slider,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import FileUploadButton from 'commons/components/molecules/UploadFileButton';
import EditObjectFields from 'commons/components/organisms/forms/EditObject';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';

const AudioEditWidget = ({
  onMutate,
  handleClose,
  paperId,
  open,
  link: initialLink,
  id: widgetId,
  autoplay: initialAutoplay,
  repeat: initialRepeat,
  volume: initialVolume,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [link, setLink] = useState<string>(initialLink || '');
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });
  const [autoplay, setAutoplay] = useState<boolean>(initialAutoplay || false);
  const [repeat, setRepeat] = useState<boolean>(initialRepeat || false);
  const [volume, setVolume] = useState<number>(initialVolume || 100);

  const handleClick = () => {
    onMutate({
      paper: paperId,
      link,
      widgetId,
      autoplay,
      repeat,
      volume,
      onSuccess: handleClose,
      ...widgetFields,
    });
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>صوت</DialogTitle>
      <DialogContent>
        <CollapsibleTitle title='مشخصات شئ'>
          <EditObjectFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
        </CollapsibleTitle>
        <Stack spacing={2}>
          <FileUploadButton setFileLink={setLink} />
          <Divider>یا</Divider>
          <DialogContentText>{t('uploadFileFillUrl')}</DialogContentText>
          <TextField
            fullWidth
            label="آدرس صوت"
            value={link}
            inputProps={{ dir: 'ltr' }}
            placeholder="http://example.com/example.mp3"
            onChange={(e) => setLink(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
              />
            }
            label="پخش خودکار"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={repeat}
                onChange={(e) => setRepeat(e.target.checked)}
              />
            }
            label="تکرار"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <DialogContentText>Volume</DialogContentText>
            <Slider
              value={volume}
              onChange={(e, newValue) => setVolume(newValue as number)}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Stack>
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

export default AudioEditWidget;
