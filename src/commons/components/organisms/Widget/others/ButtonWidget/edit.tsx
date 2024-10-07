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
  FormLabel,
  Typography,
  Autocomplete,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFile from 'commons/components/molecules/UploadFile';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import TinyEditorComponent from 'commons/components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';

const ButtonWidgetEditor = ({
  onMutate,
  handleClose,

  paperId,
  open,
  link: previousLink,
  id: widgetId,
  ...widgetProps
}) => {
  const fsmStateId = paperId;
  const t = useTranslate();
  const [buttonFields, setButtonFields] = useState({
    label: widgetProps.label || '',
    background_image: widgetProps.background_image || '',
    destination_page_url: widgetProps.destination_page_url || '',
    destination_state_ids: widgetProps.destination_state_ids || '',
  });
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });
  const { data: outwardEdges = [] } = useGetFSMStateOutwardEdgesQuery({ fsmStateId });

  const handleClick = () => {
    onMutate({
      ...widgetFields,
      paper: paperId,
      widgetId,
      onSuccess: handleClose,
      ...buttonFields,
    })
  };

  console.log(buttonFields)

  const outwardEdgesReps = outwardEdges.map(outwardEdge => ({ id: outwardEdge.id, name: outwardEdge.head.name }))

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{'دکمه'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <EditObjectFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
          <FormLabel>{'متن دکمه'}</FormLabel>
          <TinyEditorComponent
            content={buttonFields.label}
            onChange={(text) => setButtonFields({
              ...buttonFields,
              label: text,
            })}
          />
          <FormLabel>{'تصویر دکمه (اختیاری)'}</FormLabel>
          <UploadFile
            setFileLink={(link) => setButtonFields({
              ...buttonFields,
              background_image: link,
            })} />
          <Divider>یا</Divider>
          <Typography variant='caption'>{t('uploadFileFillUrl')}</Typography>
          <TextField
            fullWidth
            label="آدرس تصویر"
            value={buttonFields.background_image}
            inputProps={{ className: 'ltr-input' }}
            placeholder="http://example.com/example.png"
            onChange={(e) => setButtonFields({
              ...buttonFields,
              background_image: e.target.value
            })}
          />
          <FormLabel>{'گام‌های مقصد'}</FormLabel>
          <Autocomplete
            multiple
            fullWidth
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setButtonFields({
                ...buttonFields,
                destination_state_ids: newValue,
              });
            }}
            value={buttonFields.destination_state_ids || []}
            renderInput={(params) =>
              <TextField
                {...params}
                label="مقاصد"
              />
            }
            options={outwardEdgesReps}
          />

          <FormLabel>{'لینک مقصد'}</FormLabel>
          <TextField
            fullWidth
            label="لینک مقصد"
            value={buttonFields.destination_page_url}
            inputProps={{ className: 'ltr-input' }}
            placeholder="http://example.com/example.png"
            onChange={(e) => setButtonFields({
              ...buttonFields,
              destination_page_url: e.target.value
            })}
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

export default ButtonWidgetEditor;
