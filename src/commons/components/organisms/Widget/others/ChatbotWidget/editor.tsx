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
import ObjectFieldsEditor from 'commons/components/organisms/object/ObjectFieldsEditor'
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget'
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle'

interface ChatbotWidgetEditorProps extends Partial<ContentWidgetType> {
  onMutate: (data: any) => void
  paperId: number
  open: boolean
  handleClose: () => void

  bot_id?: string
  api_key?: string
  stream_response?: boolean
}

const ChatbotWidgetEditor: React.FC<ChatbotWidgetEditorProps> = ({
  onMutate,
  paperId,
  open,
  handleClose,
  id: widgetId,

  bot_id: previousBotId,
  api_key: previousApiKey,
  stream_response: previousStreamResponse = false,

  ...widgetProps
}) => {
  const t = useTranslate()

  const [botId, setBotId] = useState<string>(previousBotId ?? '')
  const [apiKey, setApiKey] = useState<string>(previousApiKey ?? '')
  const [streamResponse, setStreamResponse] = useState<boolean>(
    !!previousStreamResponse
  )

  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({
    ...widgetProps
  })

  const handleSubmit = () => {
    onMutate({
      paper: paperId,
      widgetId,

      bot_id: botId,
      api_key: apiKey,
      stream_response: streamResponse,

      onSuccess: handleClose,
      ...widgetFields
    })
  }

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>ویرایش چت‌بات</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>

          <Stack spacing={1}>
            <TextField
              fullWidth
              label="Metis Bot-ID"
              inputProps={{ dir: 'ltr' }}
              value={botId}
              onChange={e => setBotId(e.target.value)}
            />

            <TextField
              fullWidth
              type="password"
              label="Metis API-Key"
              inputProps={{ dir: 'ltr' }}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={streamResponse}
                  onChange={e => setStreamResponse(e.target.checked)}
                />
              }
              label="استفاده از پاسخ استریم"
            />
          </Stack>

          <CollapsibleTitle title="تنظیمات پیشرفته‌تر">
            <ObjectFieldsEditor
              fields={widgetFields}
              setFields={setWidgetFields}
            />
          </CollapsibleTitle>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChatbotWidgetEditor