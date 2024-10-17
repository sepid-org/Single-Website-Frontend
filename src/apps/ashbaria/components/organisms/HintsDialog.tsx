import Hints from "apps/ashbaria/template/Hints";
import FullScreenDialog from "commons/components/atoms/FullScreenDialog";
import React, { FC } from "react";

type HintsDialogPropsType = {
  open: boolean;
  onClose: any;
}

const HintsDialog: FC<HintsDialogPropsType> = ({
  open,
  onClose,
}) => {
  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <Hints />
    </FullScreenDialog>
  )
}

export default HintsDialog;