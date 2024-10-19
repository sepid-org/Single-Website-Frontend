import { Stack } from "@mui/material";
import Documents from "apps/ashbaria/template/Documents";
import FullScreenDialog from "commons/components/atoms/FullScreenDialog";
import React, { FC } from "react";

type DocumentsDialogPropsType = {
  open: boolean;
  onClose: any;
}

const DocumentsDialog: FC<DocumentsDialogPropsType> = ({
  open,
  onClose,
}) => {
  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <Documents />
    </FullScreenDialog>
  )
}

export default DocumentsDialog;