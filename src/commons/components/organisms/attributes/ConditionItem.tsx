import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AttributeType } from 'commons/types/object/attribute';

interface Props {
  cond: AttributeType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ConditionItem({ cond, onEdit, onDelete }: Props) {
  return (
    <ListItem
      dense
      secondaryAction={
        <>
          <Tooltip title="ویرایش">
            <IconButton edge="end" onClick={() => onEdit(cond.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton edge="end" onClick={() => onDelete(cond.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      }
      sx={{ pr: 9 /* جا برای دکمه‌ها */ }}
    >
      <ListItemText
        primary={cond.title}
        secondary={`order: ${cond.order ?? '—'}`}
      />
    </ListItem>
  );
}
