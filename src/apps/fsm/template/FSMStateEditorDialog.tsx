import React, { FC } from 'react';
import FSMStateEditor from 'apps/fsm/template/FSMStateEditor';
import FullScreenDialog from 'commons/components/atoms/FullScreenDialog';

type PropsType = {
  open: boolean;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  fsmStateId: number;
}

const FSMStateEditorDialog: FC<PropsType> = ({
  open,
  handleClose,
  fsmStateId,
}) => {

  return (
    <FullScreenDialog
      open={open}
      onClose={handleClose}
    >
      {Boolean(fsmStateId) &&
        <FSMStateEditor fsmStateId={fsmStateId.toString()} />
      }
    </FullScreenDialog>
  );
};

export default FSMStateEditorDialog;