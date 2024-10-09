import { Button, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

import CreateFSMStateDialog from 'commons/components/organisms/dialogs/CreateFSMStateDialog';

type CreateStateButtonPropsType = {}

const CreateStateButton: FC<CreateStateButtonPropsType> = ({ }) => {
  const [openCreateStateDialog, setOpenCreateStateDialog] = useState(false);

  return (
    <Fragment>
      <Button
        color="primary"
        onClick={() => setOpenCreateStateDialog(true)}
        variant="contained">
        <Typography>
          {'ایجاد گام جدید'}
        </Typography>
      </Button>
      <CreateFSMStateDialog
        open={openCreateStateDialog}
        handleClose={() => setOpenCreateStateDialog(false)}
      />
    </Fragment>
  );
}

export default CreateStateButton;