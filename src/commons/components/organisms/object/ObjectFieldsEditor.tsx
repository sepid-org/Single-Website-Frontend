import React, { FC } from 'react';
import {
  Paper,
  Stack,
  TextField,
  Typography,
  Slider,              // +++
} from '@mui/material';
import { ObjectType } from 'commons/types/object/object';
import CollapsibleJsonViewer from 'commons/utils/CollapsibleJsonViewer';
import TransitionForm from '../attributes/Transition';
import { useGetObjectAttributesQuery } from 'apps/website-display/redux/features/object/ObjectSlice';

type PropsType = {
  fields: Partial<ObjectType>;
  setFields: (f: any) => void;
};

const ObjectFieldsEditor: FC<PropsType> = ({ fields, setFields }) => {
  const objectId = fields?.object_id;
  const { data: attributes = [] } = useGetObjectAttributesQuery(
    { objectId },
    { skip: !Boolean(objectId) }
  );
  const transitionAttribute = attributes.find(
    (a) => a.type === 'Transition'
  );

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
        <Stack component={Paper} padding={2}>
          <TransitionForm
            objectId={fields.object_id}
            transitionId={transitionAttribute?.id}
          />
        </Stack>

        <Stack component={Paper} padding={2}>
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
        helperText="ویجت با اولویت بزرگ‌تر، بالاتر نمایش داده می‌شود."
        onChange={(e) => setFields({ ...fields, order: e.target.value })}
      />

      {/* ──────────────── اسلایدر تعیین اندازهٔ فونت ──────────────── */}
      <Stack
        component={Paper}
        padding={2}
        width="100%"
        spacing={2}
        alignItems="stretch"
      >
        <Typography variant="h6">بزرگ‌نمایی متن</Typography>

        <Slider
          value={Number(fields.font_scale ?? 1)}      // مقدار فعلی
          min={0.1}
          max={10}
          step={0.1}
          valueLabelDisplay="on"
          marks={[
            { value: 0.1, label: '0.1' },
            { value: 1, label: '1' },
            { value: 5, label: '5' },
            { value: 10, label: '10' },
          ]}
          onChange={(_, v) =>
            setFields({ ...fields, font_scale: v as number })
          }
        />

        <Typography variant="caption">
          مقدار ۱ یعنی اندازهٔ عادی؛ ۲ یعنی دو برابر؛ ۰٫۵ یعنی نصف.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ObjectFieldsEditor;