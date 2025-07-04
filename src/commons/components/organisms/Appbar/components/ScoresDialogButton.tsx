import { Dialog, IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import UserCurrentScores from 'commons/components/organisms/lists/UserCurrentScores';

type ScoresDialogButtonPropsType = {
}

const ScoresDialogButton: FC<ScoresDialogButtonPropsType> = ({
}) => {
  const [openScoresDialog, setOpenScoresDialog] = useState(false);

  return (
    <Fragment>
      <Tooltip arrow title='امتیازات'>
        <IconButton onClick={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
          <SportsScoreIcon />
        </IconButton>
      </Tooltip>
      <Dialog disableScrollLock maxWidth='xs' fullWidth open={openScoresDialog} onClose={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
        <UserCurrentScores />
      </Dialog>
      {openScoresDialog}
    </Fragment>
  );
}

export default ScoresDialogButton;