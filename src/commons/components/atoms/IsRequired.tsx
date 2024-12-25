import { Box, Typography } from "@mui/material"
import React from "react"

const IsRequired = ({ disabled = false, children }) => {
  return (
    <Box display="flex" alignItems="center">
      {!disabled && <Typography sx={{ mr: 0.5 }} fontWeight={800} color={'red'}>{'*'}</Typography>}
      {children}
    </Box>
  )
}

export default IsRequired;