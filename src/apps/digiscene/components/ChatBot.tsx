import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Slide } from '@mui/material';
import { ChatbotProps, ChatMessage } from '../types';

const Chatbot: React.FC<ChatbotProps> = ({ isOpen }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Here you can add logic to process the user's message and generate a system response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "سلام! من دستیار هوشمندم و اینجا هستم تا به تو کمک کنم", sender: 'system' }]);
      }, 1000);
    }
  };

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 300,
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          دستیار هوشمند
        </Typography>
        <List ref={chatListRef} sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {chatMessages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    backgroundColor: message.sender === 'user' ? 'rgba(227, 242, 253, 0.7)' : 'rgba(241, 248, 233, 0.7)',
                    borderRadius: '10px',
                    padding: '8px',
                    display: 'inline-block'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="پیامی بنویسید..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSendMessage}
            sx={{ mt: 1 }}
          >
            ارسال
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default Chatbot;