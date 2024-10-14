import { Dialog, IconButton } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import QuestionEditor from "../organisms/QuestionEditor";
import EditIcon from '@mui/icons-material/Edit';

type EditQuestionButtonPropsType = {
  questionId: number;
}

const EditQuestionButton: FC<EditQuestionButtonPropsType> = ({
  questionId,
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
        <QuestionEditor id={questionId} onClose={() => setOpenDialog(false)} />
      </Dialog>
    </Fragment>
  )
}

export default EditQuestionButton;