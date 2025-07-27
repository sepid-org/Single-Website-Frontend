import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import RefreshIcon from '@mui/icons-material/Refresh'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  useStartChatSessionMutation,
  useSendChatMessageMutation,
  useGetChatSessionQuery,
  useResetChatSessionMutation,
} from 'apps/website-display/redux/features/sales/Chatbot'
import { WidgetModes } from '../..'
import { useFSMContext } from 'commons/hooks/useFSMContext'


type ChatbotWidgetProps = {
  label: string;
  background_image: string;
  destination_page_url: string;
  mode: WidgetModes;
  id: string;
  has_ripple_on_click: boolean;
  has_wave_effect: boolean;
};

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  mode,
  id: widgetId,
  ...rest
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const { player } = useFSMContext();


  console.log(rest)

  /* RTK hooks */
  const [startSession, { isLoading: starting }] =
    useStartChatSessionMutation()
  const [sendMessage, { isLoading: sending }] = useSendChatMessageMutation()
  const {
    data: session,
    isFetching,
    refetch
  } = useGetChatSessionQuery(
    sessionId ? { sessionId } : skipToken,
    { pollingInterval: 30_000 }      // optional auto-refresh
  )
  const [resetChat, { isLoading: resetting }] = useResetChatSessionMutation()

  /* build a session on first mount */
  useEffect(() => {
    if (!sessionId && !starting && player && widgetId) {
      startSession({
        widgetId: parseInt(widgetId),
        playerId: parseInt(player.id),
      })
        .unwrap()
        .then(res => setSessionId(res.id))
        .catch(console.error)
    }
  }, [sessionId, starting])

  /* handlers */
  const handleSend = () => {
    if (!input.trim() || !sessionId || sending) return
    sendMessage({ sessionId, content: input.trim() })
      .unwrap()
      .then(() => setInput(''))
      .catch(console.error)
  }

  const handleReset = () => {
    if (!sessionId || resetting) return
    resetChat({ sessionId })
      .unwrap()
      .then(() => setSessionId(null))      // triggers new session on next render
      .catch(console.error)
  }

  const renderMessage = (m: any) => (
    <Box
      key={m.id}
      alignSelf={m.type === 'USER' ? 'flex-end' : 'flex-start'}
      sx={{
        bgcolor: m.type === 'USER' ? 'primary.main' : 'grey.300',
        color: m.type === 'USER' ? 'primary.contrastText' : 'text.primary',
        px: 2,
        py: 1,
        borderRadius: 2,
        maxWidth: '80%'
      }}>
      <Typography variant="body2">{m.content}</Typography>
    </Box>
  )

  if (mode !== WidgetModes.View) {
    return ("nothing to see here");
  }

  return (
    <Paper elevation={3} sx={{ p: 2, minHeight: 350 }}>
      {/* header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Chatbot</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={() => refetch()}>
            {isFetching ? <CircularProgress size={18} /> : <RefreshIcon />}
          </IconButton>
          <IconButton size="small" onClick={handleReset}>
            {resetting ? <CircularProgress size={18} /> : <RestartAltIcon />}
          </IconButton>
        </Stack>
      </Stack>

      {/* messages list */}
      <Stack
        spacing={1}
        sx={{ my: 2, maxHeight: 220, overflowY: 'auto' }}>
        {session?.messages?.map(renderMessage)}
        {(starting || !sessionId) && (
          <Typography variant="body2" color="text.secondary">
            Initialising chat…
          </Typography>
        )}
      </Stack>

      {/* input box */}
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={starting || !sessionId}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend()
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={
            sending || starting || !input.trim() || !sessionId
          }>
          Send
        </Button>
      </Stack>
    </Paper>
  )
}

export default ChatbotWidget;