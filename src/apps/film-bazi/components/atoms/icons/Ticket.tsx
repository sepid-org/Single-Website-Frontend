import React from 'react';
import ticketSvg from "../../../assets/ticket.svg";
import { Box } from '@mui/material';

const TicketIcon = (props) => {
  return (
    <Box
      component="img"
      src={ticketSvg}
      sx={{
        width: 40,
      }}
    />
  );
};

export default TicketIcon;