import { IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import HintsIcon from "../../atoms/icons/Hints";
import HintsDialog from "../../organisms/HintsDialog";

const HintsButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => setOpenDialog(true)}>
        <HintsIcon />
      </IconButton>
      <HintsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Fragment>
  )
}

export default HintsButton;