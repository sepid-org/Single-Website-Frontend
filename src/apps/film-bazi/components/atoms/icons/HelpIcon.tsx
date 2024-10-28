import React from 'react';
import QuestionSvg from "../../../assets/question-square.svg";
import { Box } from '@mui/material';

const QuestionIcon = ({ width = 40 }) => {
  return (
    <Box
      component="img"
      src={QuestionSvg}
      sx={{
        width: 40,
      }}
    />
  );
};

export default QuestionIcon;