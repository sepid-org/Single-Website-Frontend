import React, { Fragment, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';

import DeleteWidgetDialog from 'commons/components/organisms/dialogs/DeleteWidgetDialog';
import EditWidgetHintsDialog from 'commons/components/organisms/dialogs/EditWidgetHintsDialog';
import useWidgetFactory from './useWidgetFactory';
import CreateAttributeDialog from '../dialogs/CreateAttributeDialog';

const WidgetEditMenu = ({
  widget,
  paperId,
}) => {
  const [openAddAttributeDialog, setAddAttributeDialogOpen] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditWidgetDialog, setOpenEditWidgetDialog] = useState(false);
  const [openEditHintDialog, setEditHintDialog] = useState(false);
  const {
    onDelete,
    onMutate,
    EditWidgetDialog,
  } = useWidgetFactory({
    widgetId: widget.id.toString(),
    paperId,
    widgetType: widget.widget_type,
  });

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      {/* <Tooltip title='ویژگی‌ها' arrow>
        <IconButton size='small' onClick={() => setAddAttributeDialogOpen(true)}>
          <PaidIcon />
        </IconButton>
      </Tooltip> */}
      <Tooltip title='راهنمایی‌ها' arrow>
        <IconButton size='small' onClick={() => { setEditHintDialog(true) }}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='ویرایش' arrow>
        <IconButton size='small' onClick={() => { setOpenEditWidgetDialog(true) }}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='حذف' arrow>
        <IconButton size='small' onClick={() => { setOpenDeleteWidgetDialog(true) }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Box
        onMouseDown={preventPropagation}
        onMouseUp={preventPropagation}
        onClick={preventPropagation}
        onKeyDown={preventPropagation}
        onKeyUp={preventPropagation}
      >
        <CreateAttributeDialog
          open={openAddAttributeDialog}
          handleClose={() => setAddAttributeDialogOpen(!openAddAttributeDialog)}
        />
        <EditWidgetDialog
          {...widget}
          open={openEditWidgetDialog}
          handleClose={() => setOpenEditWidgetDialog(false)}
          onMutate={onMutate}
        />
        <DeleteWidgetDialog
          widgetId={widget.id}
          open={openDeleteWidgetDialog}
          handleClose={() => setOpenDeleteWidgetDialog(false)}
          onDelete={onDelete}
        />
        <EditWidgetHintsDialog
          referenceId={widget.id}
          open={openEditHintDialog}
          handleClose={() => setEditHintDialog(false)}
        />
      </Box>
    </Fragment >
  );
};

export default WidgetEditMenu;