import { Button, IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import DocumentsDialog from "../../organisms/DocumentsDialog";
import DocumentIcon from "../../atoms/icons/Documents";

const DocumentsButton = ({ }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => setOpenDialog(true)}>
        <DocumentIcon />
      </IconButton>
      <DocumentsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Fragment>
  )
}

export default DocumentsButton;