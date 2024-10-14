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
import UploadFileButton from 'commons/components/molecules/UploadFileButton';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import TinyEditorComponent from 'commons/components/organisms/TinyMCE/ReactTiny/TinyEditorComponent';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

const ButtonWidgetEditor = ({
  onMutate,
  handleClose,

  paperId,
  open,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate();
  const { fsmStateId } = useFSMStateContext();
  const [buttonFields, setButtonFields] = useState({
    label: widgetProps.label || '',
    background_image: widgetProps.background_image || '',
    destination_page_url: widgetProps.destination_page_url || '',
    edges_to_destination_states: widgetProps.edges_to_destination_states || [],
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

  const outwardEdgesReps = outwardEdges.map(outwardEdge => ({ ...outwardEdge, name: outwardEdge.head.title }))

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>{'دکمه'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <EditObjectFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
          <Stack>
            <FormLabel>{'متن دکمه'}</FormLabel>
            <TinyEditorComponent
              content={buttonFields.label}
              onChange={(text) => setButtonFields({
                ...buttonFields,
                label: text,
              })}
            />
          </Stack>

          <Stack direction={'row'} spacing={2} alignItems={'start'}>
            <TextField
              fullWidth
              label={'تصویر دکمه'}
              value={buttonFields.background_image}
              inputProps={{ className: 'ltr-input' }}
              placeholder="https://..."
              onChange={(e) => setButtonFields({
                ...buttonFields,
                background_image: e.target.value
              })}
              helperText={t('uploadFileFillUrl')}
            />
            <UploadFileButton
              setFileLink={(link) => setButtonFields({
                ...buttonFields,
                background_image: link,
              })}
            />
          </Stack>

          <Autocomplete
            isOptionEqualToValue={(option, value) => option.name === value.head.title}
            multiple
            fullWidth
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setButtonFields({
                ...buttonFields,
                edges_to_destination_states: newValue,
              });
            }}
            value={buttonFields.edges_to_destination_states || []}
            renderInput={(params) =>
              <TextField
                {...params}
                label='گام‌های مقصد'
                helperText={'توجه کنید که فقط یال‌های خروجی همین گام در این لیست نمایش داده می‌شود. برای افزودن یال به صفحه‌ی یال‌ها مراجعه کنید.'}
              />
            }
            options={outwardEdgesReps}
          />

          <TextField
            fullWidth
            label="لینک مقصد"
            disabled={buttonFields.edges_to_destination_states.length > 0}
            value={buttonFields.destination_page_url}
            inputProps={{ className: 'ltr-input' }}
            placeholder="https://..."
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
