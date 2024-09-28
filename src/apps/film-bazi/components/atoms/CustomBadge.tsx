import { Stack } from "@mui/material"
import React from "react"

const CustomBadge = ({ children }) => {

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        background: '#00000033',
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
      }}>
      {children}
    </Stack>
  )
}

export default CustomBadge;