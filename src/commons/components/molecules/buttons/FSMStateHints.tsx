import React, { FC, Fragment, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import HintDialog from 'commons/components/organisms/dialogs/HintDialog';
import { useGetFSMStateHintsQuery } from 'apps/website-display/redux/features/hint/HintSlice';

type FSMStateHintsButtonPropsType = {
  fsmStateId: string;
}

const FSMStateHintsButton: FC<FSMStateHintsButtonPropsType> = ({
  fsmStateId,
}) => {
  const { data: hints = [] } = useGetFSMStateHintsQuery({ fsmStateId });
  const [openDialog, setOpenDialog] = useState(false);
  const [isHover, setIsHover] = useState(false);

  if (hints.length === 0) return null;

  return (
    <Fragment>
      <Tooltip arrow title='راهنمایی'>
        <IconButton disableRipple onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} onClick={() => setOpenDialog(true)}>
          <img width={40} src={process.env.PUBLIC_URL + ((isHover || openDialog) ? '/images/idea-on.png' : '/images/idea-off.png')} />
        </IconButton>
      </Tooltip>
      <HintDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        hints={hints}
      />
    </Fragment>
  );
};

export default FSMStateHintsButton;
