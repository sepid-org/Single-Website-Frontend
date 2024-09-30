import {
  Stack,
  TextField,
} from '@mui/material';
import React, { FC } from 'react';
import { ObjectType } from 'commons/types/models';

type EditObjectFieldsPropsType = {
  fields: Partial<ObjectType>;
  setFields: (fields: Partial<ObjectType>) => void;
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
        label='نام'
      />
      <TextField
        fullWidth
        value={fields.order || 0}
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
