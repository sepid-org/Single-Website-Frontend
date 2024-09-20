import { IconButton, Stack, Typography } from "@mui/material"
import React from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AccountBadge = ({ score = 1085 }) => {

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
      }}>
      {/* image */}
      <Typography fontWeight={700} fontSize={18} color={'white'}>
        {'سید علیرضا هاشمی'}
      </Typography>
      <IconButton>
        <KeyboardArrowDownIcon sx={{ color: 'white' }} />
      </IconButton>
    </Stack>
  )
}

export default AccountBadge;