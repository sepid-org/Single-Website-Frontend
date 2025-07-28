import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ChatbotMessageType } from 'apps/website-display/redux/features/sales/Chatbot';

const Message: React.FC<ChatbotMessageType> = ({ sender, content }) => {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const isUser = sender === 'USER';

  console.log(sender, content);

  const alignSelf =
    isUser
      ? (isRtl ? 'flex-start' : 'flex-end')
      : (isRtl ? 'flex-end' : 'flex-start');

  console.log(isRtl, alignSelf)

  return (
    <Box
      alignSelf={alignSelf}
      sx={{
        bgcolor: isUser ? 'primary.main' : 'grey.300',
        color: isUser ? 'primary.contrastText' : 'text.primary',
        px: 2,
        py: 1,
        borderRadius: 2,
        maxWidth: '80%',
      }}
    >
      <Typography variant="body2">{content}</Typography>
    </Box>
  );
};

export default Message;