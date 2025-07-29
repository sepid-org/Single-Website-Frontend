import React, { FC, useState } from 'react';
import {
  Paper,
  Stack,
  TextField,
  Typography,
  Slider,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ObjectType } from 'commons/types/object/object';
import CollapsibleJsonViewer from 'commons/utils/CollapsibleJsonViewer';
import TransitionForm from '../attributes/Transition';
import { useGetObjectAttributesQuery } from 'apps/website-display/redux/features/object/ObjectSlice';
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
  fields: Partial<ObjectType>;
  setFields: (f: any) => void;
};

const ObjectFieldsEditor: FC<PropsType> = ({ fields, setFields }) => {
  const objectId = fields?.object_id;
  const { data: attributes = [], refetch } = useGetObjectAttributesQuery(
    { objectId },
    { skip: !Boolean(objectId) }
  );

  /* ───────── state for creating new transition ───────── */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);

  const openNewTransition = () => {
    setEditingId(undefined); // حالت ایجاد
    setDialogOpen(true);
  };

  const openEditTransition = (id: number) => {
    setEditingId(id);        // حالت ویرایش
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  /* ───────── طبقه‌بندی و مرتب‌سازی ───────── */
  const transitionAttributes = attributes
    .filter((a) => a.type === 'Transition')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (!objectId) {
    return (
      <Typography>
        {
          'برای تنظیم پیشرفته‌تر ویجت، ابتدا ویجت را کامل بسازید و سپس مجدداً به این بخش مراجعه کنید.'
        }
      </Typography>
    );
  }

  return (
    <Stack alignItems="start" spacing={2}>
      {/* تنظیمات پیشرفته */}
      <Stack width="100%" spacing={2}>

        {/* ───── ترنزیشن‌ها ───── */}
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">ترنزیشن‌ها:</Typography>
            <Button variant="outlined" size="small" onClick={openNewTransition}>
              افزودن ترنزیشن
            </Button>
          </Stack>

          {transitionAttributes.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              هیچ ترنزیشنی تعریف نشده است.
            </Typography>
          ) : (
            transitionAttributes.map((attr) => (
              <Stack
                component={Paper}
                key={attr.id}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ padding: 1, cursor: 'pointer' }}
                onClick={() => openEditTransition(attr.id)}
              >
                <Typography>
                  {attr.title} — ترتیب: {attr.order ?? '—'}
                </Typography>
              </Stack>
            ))
          )}
        </Stack>

        {/* نمایش همهٔ اتریبیوت‌ها */}
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom>
            {'همه اتریبیوت‌ها:'}
          </Typography>
          <CollapsibleJsonViewer data={attributes} />
        </Stack>
      </Stack>

      {/* شناسه ویجت */}
      <TextField
        fullWidth
        value={fields.name || ''}
        name="name"
        label="شناسه"
        helperText="شناسه‌ی هر ویجت باید یکتا باشد."
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
      />

      {/* اولویت نمایش */}
      <TextField
        fullWidth
        value={fields.order || ''}
        name="order"
        label="اولویت نمایش"
        helperText="ویجت با اولویت بزرگ‌تر، پایین‌تر نمایش داده می‌شود."
        onChange={(e) => setFields({ ...fields, order: e.target.value })}
      />

      {/* اسلایدر تعیین اندازهٔ فونت */}
      <Stack component={Paper} padding={2} width="100%" spacing={2}>
        <Typography variant="h6">بزرگ‌نمایی متن</Typography>

        <Slider
          value={Number(fields.font_scale ?? 1)}
          min={0.1}
          max={5}
          step={0.1}
          valueLabelDisplay="on"
          marks={[
            { value: 0.1, label: '0.1' },
            { value: 1, label: '1' },
            { value: 5, label: '5' },
          ]}
          onChange={(_, v) => setFields({ ...fields, font_scale: v as number })}
        />

        <Typography variant="caption">
          مقدار ۱ یعنی اندازهٔ عادی؛ ۲ یعنی دو برابر؛ ۰٫۵ یعنی نصف.
        </Typography>
      </Stack>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          {editingId ? 'ویرایش ترنزیشن' : 'ایجاد ترنزیشن'}
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TransitionForm
            objectId={objectId}
            transitionId={editingId}
            onSuccess={() => {
              closeDialog();
              refetch(); // لیست به‌روزرسانی
            }}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default ObjectFieldsEditor;