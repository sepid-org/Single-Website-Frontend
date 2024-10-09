import React from 'react';
import { Paper, styled } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 480,
  padding: 32,
  borderRadius: 32,
  border: '1px 0px 0px 0px',
  background: `linear-gradient(0deg, rgba(23, 19, 45, 0.9), rgba(23, 19, 45, 0.9)),
               linear-gradient(180deg, rgba(255, 255, 255, 0.01) 50%, rgba(33, 122, 255, 0.1) 100%)`,
  borderTop: '1px solid #606060',
  backdropFilter: 'blur(20px)',
  boxShadow: '0px 4px 4px 0px #00000040',
}));

const CustomDialogPaper = ({ children }) => {
  return <StyledPaper elevation={0}>{children}</StyledPaper>;
};

export default CustomDialogPaper;