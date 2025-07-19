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

  const { data: attributes = [] } = useGetObjectAttributesQuery({ objectId: fields?.object_id }, { skip: !Boolean(fields?.object_id) });
  const transitionAttribute = attributes.find(attribute => attribute.type === 'Transition');

  return (
    <Stack alignItems={'start'} spacing={2}>
      {attributes &&
        <Stack width={'100%'} spacing={2}>
          <TransitionForm objectId={fields.object_id} transitionId={transitionAttribute?.id} />
          <Typography variant="h6" gutterBottom>
            {'همه ویژگی‌ها:'}
          </Typography>
          <CollapsibleJsonViewer data={attributes} />
        </Stack>
      }
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
