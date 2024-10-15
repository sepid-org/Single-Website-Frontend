import { Checkbox, Dialog, IconButton, Stack } from "@mui/material";
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation, useGetFSMEdgeQuery, useUpdateFSMEdgeMutation } from "apps/fsm/redux/slices/fsm/EdgeSlice";
import { EdgeType } from "commons/types/models";
import React, { FC, Fragment, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

type EdgeEditorDialogPropsType = {
  id: string;
  open: boolean
  onClose: any;
}

const EdgeEditorDialog: FC<EdgeEditorDialogPropsType> = ({
  id,
  open,
  onClose,
}) => {
  const { data: initialEdge } = useGetFSMEdgeQuery({ edgeId: id }, { skip: !Boolean(id) });
  const [createFSMEdge] = useCreateFSMEdgeMutation();
  const [updateFSMEdge] = useUpdateFSMEdgeMutation();
  const [deleteFSMEdge] = useDeleteFSMEdgeMutation();
  const [edge, setEdge] = useState<EdgeType>(null);

  useEffect(() => {
    if (initialEdge) {
      setEdge(initialEdge);
    }
  }, [initialEdge])

  return (
    <Fragment>

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='sm'
      >
        <Stack>
          <Checkbox
            checked={edge?.is_visible}
            onChange={() => {
              setEdge({
                ...edge,
                is_visible: !edge?.is_visible,
              })
            }}
            color="primary"
          />
          <Checkbox
            checked={edge?.is_back_enabled}
            onChange={() => {
              setEdge({
                ...edge,
                is_back_enabled: !edge?.is_back_enabled,
              })
            }}
            color="primary"
          />
          <IconButton size='small'
            onClick={() => {
              deleteFSMEdge({ fsmEdgeId: edge?.id })
            }}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Dialog>
    </Fragment>
  )
}

export default EdgeEditorDialog;