import React from 'react'
import RandomWidgetEditor from './edit'
import Widget, { WidgetModes } from '../..'
import { Box, Stack, Typography } from '@mui/material'
export { RandomWidgetEditor }

const RandomWidget = ({ widget, paperId, mode, ...props }) => {

  if (mode !== WidgetModes.View) {
    return (
      <Box width={'100%'} height={'100%'} sx={{ backgroundColor: 'purple' }} />
    );
  }

  if (Object.keys(widget).length === 0) {
    return (
      <Stack
        width={'100%'} height={'100%'}
        sx={{ backgroundColor: 'gray', borderRadius: 2 }}
        alignItems={'center'} justifyContent={'center'}
      >
        <Typography>
          {'ویجتی برای نمایش وجود ندارد'}
        </Typography>
      </Stack>
    )
  }

  return (
    <Widget paperId={paperId} widget={widget} {...props} coveredWithPaper={false} />
  );
}

export default RandomWidget
