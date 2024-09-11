import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import CreateWidgetDialog from 'commons/components/organisms/dialogs/CreateWidgetDialog';

type CreateWidgetPropsType = {
  paperId: string;
  mode?: 'contents' | 'problems' | 'all';
}

const CreateWidgetButton: FC<CreateWidgetPropsType> = ({
  paperId,
  mode = 'all',
}) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  return (
    <Fragment>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpenCreateWidgetDialog(true)}
        startIcon={<AddIcon />}>
        {t('createWidget')}
      </Button>
      <CreateWidgetDialog
        showProblems={mode === 'problems' || mode === 'all'}
        showContent={mode === 'contents' || mode === 'all'}
        paperId={paperId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </Fragment>
  );
}

export default CreateWidgetButton;
