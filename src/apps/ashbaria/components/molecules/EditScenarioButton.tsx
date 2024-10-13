import { Dialog, IconButton } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ScenarioEditor from "../organisms/ScenarioEditor";

type EditScenarioButtonPropsType = {
  scenarioId: number;
}

const EditScenarioButton: FC<EditScenarioButtonPropsType> = ({
  scenarioId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <IconButton onClick={() => setOpenDialog(true)}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <ScenarioEditor id={scenarioId} onClose={() => setOpenDialog(false)} />
      </Dialog>
    </Fragment>
  )
}

export default EditScenarioButton;