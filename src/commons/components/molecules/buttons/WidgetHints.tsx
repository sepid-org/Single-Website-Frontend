import React, { FC, Fragment, useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';

import HintDialog from 'commons/components/organisms/dialogs/HintDialog';
import { useGetWidgetHintsQuery } from 'apps/website-display/redux/features/hint/HintSlice';

type WidgetHintsButtonPropsType = {
  widgetId: string;
}

const WidgetHintsButton: FC<WidgetHintsButtonPropsType> = ({
  widgetId,
}) => {
  const [openViewHintDialog, setViewHintDialog] = useState(false);
  const { data: hints = [] } = useGetWidgetHintsQuery({ widgetId });
  const [isHover, setIsHover] = useState(false);

  return (
    <Fragment>
      <Box sx={{ position: 'absolute', right: -10, top: -18, rotate: '-24deg', zIndex: 1 }}>
        <Tooltip arrow title='راهنمایی'>
          <IconButton
            sx={{
              opacity: 0.4,
              ":hover": { opacity: 1 },
            }}
            disableRipple
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            onClick={() => { setViewHintDialog(true); }}>
            <img width={40} src={process.env.PUBLIC_URL + ((isHover || openViewHintDialog) ? '/images/idea-on.png' : '/images/idea-off.png')} />
          </IconButton>
        </Tooltip>
      </Box>
      <HintDialog
        open={openViewHintDialog}
        handleClose={() => setViewHintDialog(false)}
        hints={hints}
      />
    </Fragment >
  );
};

export default WidgetHintsButton;
