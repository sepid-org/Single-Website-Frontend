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
  FormControlLabel
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslate } from 'react-redux-multilingual/lib/context'
import FileUploadButton from 'commons/components/molecules/UploadFileButton'
import EditObjectFields from 'commons/components/organisms/forms/EditObject'
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget'
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle'

const RandomWidgetEditor = ({
  onMutate,

  paperId,
  open,
  link: previousLink,
  box_paper_id: previousBoxPaperId,
  unique_widgets_only: previousUniqueWidgetsOnly,
  handleClose,
  id: widgetId,
  ...widgetProps
}) => {
  const t = useTranslate()
  const [boxPaperId, setBoxPaperId] = useState<number>(previousBoxPaperId);
  const [uniqueWidgetsOnly, setUniqueWidgetsOnly] = useState<boolean>(previousUniqueWidgetsOnly);
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });

  const handleClick = () => {
    onMutate({
      paper: paperId,
      box_paper_id: boxPaperId,
      unique_widgets_only: uniqueWidgetsOnly,
      widgetId,
      onSuccess: handleClose,
      ...widgetFields,
    })
  }

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>تصادفی</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <CollapsibleTitle title='مشخصات شئ'>
            <EditObjectFields
              fields={widgetFields}
              setFields={setWidgetFields}
            />
          </CollapsibleTitle>
          <TextField
            fullWidth
            label="شناسه برگه (به‌عنوان جعبه)"
            value={boxPaperId}
            inputProps={{ dir: 'ltr' }}
            onChange={(e) => { setBoxPaperId(parseInt(e.target.value)) }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={uniqueWidgetsOnly}
                onChange={(e) => setUniqueWidgetsOnly(e.target.checked)}
              />
            }
            label="فقط ویجت‌های یکتا نمایش بده"
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
  )
}

export default RandomWidgetEditor
