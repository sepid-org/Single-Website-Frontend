import {
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ObjectType } from 'commons/types/object/object';
import CollapsibleJsonViewer from 'commons/utils/CollapsibleJsonViewer';
import React, { FC } from 'react';
import TransitionForm from '../attributes/Transition';
import { useGetObjectAttributesQuery } from 'apps/website-display/redux/features/object/ObjectSlice';

type PropsType = {
  fields: Partial<ObjectType>;
  setFields: any;
}

const ObjectFieldsEditor: FC<PropsType> = ({
  fields,
  setFields,
}) => {

  const objectId = fields?.object_id;
  const { data: attributes = [] } = useGetObjectAttributesQuery({ objectId }, { skip: !Boolean(objectId) });
  const transitionAttribute = attributes.find(attribute => attribute.type === 'Transition');

  if (!objectId) {
    return (
      <Typography>
        {'برای تنظیم پیشرفته‌تر ویجت، ابتدا ویجت را کامل بسازید و سپس مجدداً به این بخش مراجعه کنید.'}
      </Typography>
    )
  }

  return (
    <Stack alignItems={'start'} spacing={2}>
      <Stack width={'100%'} spacing={2}>
        <Stack component={Paper} padding={2}>
          <TransitionForm objectId={fields.object_id} transitionId={transitionAttribute?.id} />
        </Stack>
        <Stack component={Paper} padding={2}>
          <Typography variant="h6" gutterBottom>
            {'همه اتریبیوت‌ها:'}
          </Typography>
          <CollapsibleJsonViewer data={attributes} />
        </Stack>
      </Stack>

      <TextField
        fullWidth
        value={fields.name || ''}
        name="name"
        onChange={(e) => {
          setFields({
            ...fields,
            name: e.target.value,
          })
        }}
        label='شناسه'
        helperText={'شناسه‌ی هر ویجت باید یکتا باشد. این شناسه برای ارجاع‌دادن به ویجت استفاده می‌شود.'}
      />

      <TextField
        fullWidth
        value={fields.order || ''}
        variant='outlined'
        label={'اولویت نمایش'}
        name='order'
        onChange={(e) => {
          setFields({
            ...fields,
            order: e.target.value,
          })
        }}
        helperText={'ویجت با اولویت نمایش بزرگ‌تر، بالاتر نمایش داده می‌شود.'}
      />
    </Stack>
  );
}

export default ObjectFieldsEditor;
