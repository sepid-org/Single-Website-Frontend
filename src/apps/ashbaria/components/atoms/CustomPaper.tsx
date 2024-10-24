import React from 'react';
import { Paper, styled } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: 24,
  borderRadius: 32,
  background: 'linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)',
  borderTop: '2.91px solid rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5.822803020477295px)',
  boxShadow: '0px 5.82px 5.82px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  position: 'relative',
}));

const CustomPaper = ({ children }) => {
  return <StyledPaper elevation={0}>{children}</StyledPaper>;
};

export default CustomPaper;