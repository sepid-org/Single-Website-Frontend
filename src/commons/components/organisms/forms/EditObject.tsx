import {
  Stack,
  TextField,
} from '@mui/material';
import { ObjectType } from 'commons/types/object/object';
import React, { FC } from 'react';

type EditObjectFieldsPropsType = {
  fields: Partial<ObjectType>;
  setFields: any;
}

const EditObjectFields: FC<EditObjectFieldsPropsType> = ({
  fields,
  setFields,
}) => {

  return (
    <Stack alignItems={'start'} spacing={2}>
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

export default EditObjectFields;
