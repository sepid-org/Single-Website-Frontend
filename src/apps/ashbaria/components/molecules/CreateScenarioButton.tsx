import { Button, Dialog, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import QuestionEditor from "../organisms/QuestionEditor";
import ScenarioEditor from "../organisms/ScenarioEditor";

type CreateScenarioButtonPropsType = {}

const CreateScenarioButton: FC<CreateScenarioButtonPropsType> = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Button variant='contained' onClick={() => setOpenDialog(true)}>
        {'افزودن سناریوی جدید'}
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <ScenarioEditor onClose={() => setOpenDialog(false)} />
      </Dialog>
    </Fragment>
  )
}

export default CreateScenarioButton;