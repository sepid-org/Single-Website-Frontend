import { Stack, Typography } from "@mui/material"
import React from "react"
import InfoIcon from '@mui/icons-material/Info';

const CustomWarning = ({ text }) => {

  return (
    <Stack
      spacing={0.5}
      width={'100%'}
      direction={'row'}
      alignItems={'center'}
      sx={{
        background: '#FF4D4F',
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
      }}>
      <InfoIcon />
      <Typography>
        {text}
      </Typography>
    </Stack>
  )
}

export default CustomWarning;