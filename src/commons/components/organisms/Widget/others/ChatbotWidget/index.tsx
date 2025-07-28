import React, { useEffect, useRef, useState } from 'react'
import {
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Tooltip
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
import Message from './Message'

type ChatbotWidgetProps = {
  mode: WidgetModes;
  id: string;
  title: string;
};

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  mode,
  id: widgetId,
  title,
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const { player } = useFSMContext();
  const hasStartedRef = useRef(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  /* RTK hooks */
  const [startSession, { isLoading: starting }] = useStartChatSessionMutation()
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

  useEffect(() => {
    if (hasStartedRef.current) return;
    if (sessionId || starting || !player || !widgetId) return
    hasStartedRef.current = true;

    startSession({
      widgetId: parseInt(widgetId),
      playerId: parseInt(player.id),
    })
      .unwrap()
      .then(res => setSessionId(res.id))
      .catch(console.error)

  }, [player, widgetId, starting])

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [session?.messages?.length]);

  const handleSend = () => {
    if (!input.trim() || !sessionId || sending) return
    sendMessage({ sessionId, content: input.trim() })
      .unwrap()
      .then(() => setInput(''))
      .catch(console.error)
  }

  const handleReset = () => {
    if (!sessionId) return;
    resetChat({ sessionId })
      .unwrap()
      .then(() => {
        setSessionId(null);
        hasStartedRef.current = false;
      })
      .catch(console.error);
  };

  if (mode !== WidgetModes.View) {
    return ("برای مشاهده چت‌بات، لطفاً از حالت ویرایش خارج و به حالت نمایش بروید.");
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{`گفتگو با ${title}`}</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="بارگذاری مجدد گفتگو">
            <IconButton size="small" onClick={() => refetch()}>
              {isFetching ? <CircularProgress size={18} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="بازنشانی گفتگو">
            <IconButton size="small" onClick={handleReset}>
              {resetting ? <CircularProgress size={18} /> : <RestartAltIcon />}
            </IconButton>
          </Tooltip> */}
        </Stack>
      </Stack>

      {/* messages list */}
      <Stack
        ref={listRef}
        spacing={1}
        sx={{ mt: 2, mb: 2, flex: 1, minHeight: 0, overflowY: 'auto' }}
      >
        {(starting || !sessionId) && (
          <Typography variant="body2" color="text.secondary">
            در حال آماده‌سازی...
          </Typography>
        )}

        {!starting && session?.messages?.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mx: 'auto', mt: 1 }}
          >
            هنوز پیامی ثبت نشده است.
          </Typography>
        )}

        {session?.messages?.map((m) => (
          <Message
            key={m.id}
            id={m.id}
            sender={m.sender}
            content={m.content}
          />
        ))}
      </Stack>

      {/* input box */}
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="پیام خود را بنویسید..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={sending || starting || !sessionId}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend()
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={sending || starting || !input.trim() || !sessionId}
          sx={{ ml: 1 }}
        >
          {sending ? (
            <CircularProgress size={24} />
          ) : (
            <SendIcon sx={{ transform: 'rotate(-180deg)' }} />
          )}
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default ChatbotWidget;