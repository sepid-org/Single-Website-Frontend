import { IconButton } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import EdgeEditorDialog from "./EdgeEditorDialog";


type EdgeEditorButtonPropsType = {
  id?: string;
}

const EdgeEditorButton: FC<EdgeEditorButtonPropsType> = ({
  id,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <IconButton onClick={() => setOpenDialog(true)}>
        <SettingsIcon />
      </IconButton>
      <EdgeEditorDialog
        id={id}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Fragment>
  )
}

export default EdgeEditorButton;