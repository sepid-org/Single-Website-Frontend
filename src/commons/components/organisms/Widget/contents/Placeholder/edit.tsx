import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';


const EditablePlaceholder = ({
  onMutate,
  handleClose,

  paperId,
  open,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });

  const handleClick = () => {
    onMutate({
      paper: paperId,
      widgetId,
      onSuccess: handleClose,
      ...widgetFields,
    });
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>جانگهدار</DialogTitle>
      <DialogContent>
        <EditObjectFields
          fields={widgetFields}
          setFields={setWidgetFields}
        />
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

export default EditablePlaceholder;
