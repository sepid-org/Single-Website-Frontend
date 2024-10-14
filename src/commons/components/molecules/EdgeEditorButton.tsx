import { IconButton } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
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
        <EditIcon />
      </IconButton>
      <EdgeEditorDialog
        id={id}
        open={openDialog}
        onClose={setOpenDialog}
      />
    </Fragment>
  )
}

export default EdgeEditorButton;