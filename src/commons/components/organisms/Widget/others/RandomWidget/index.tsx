import React from 'react'
import RandomWidgetEditor from './edit'
import Widget, { WidgetModes } from '../..'
import { Box, Typography } from '@mui/material'
export { RandomWidgetEditor }

const RandomWidget = ({ widget, paperId, mode, ...props }) => {

  if (mode !== WidgetModes.View) {
    return (
      <Box width={'100%'} height={'100%'} sx={{ backgroundColor: 'purple' }} />
    );
  }

  if (!widget) {
    return (
      <Typography>
        {'ویجتی برای نمایش وجود ندارد'}
      </Typography>
    )
  }

  return (
    <Widget paperId={paperId} widget={widget} {...props} coveredWithPaper={false} />
  );
}

export default RandomWidget
