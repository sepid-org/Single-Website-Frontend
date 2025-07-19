import { Stack } from "@mui/material"
import React from "react"

const CustomChip = ({ children }) => {

  return (
    <Stack
      width={'100%'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        background: '#09081299',
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
      }}>
      {children}
    </Stack>
  )
}

export default CustomChip;