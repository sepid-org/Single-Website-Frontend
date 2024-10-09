import { Autocomplete, Stack, TextField } from '@mui/material';
import React, { FC } from 'react';

import { FSMStateType } from 'commons/types/models';
import CreateStateButton from '../atoms/CreateStateButton';

type StatesMenuPropsType = {
  stateIndex: any;
  setStateIndex: any;
  states: FSMStateType[];
}

const StatesMenu: FC<StatesMenuPropsType> = ({
  stateIndex,
  setStateIndex,
  states = [],
}) => {

  return (
    <Stack direction={'row'} alignContent={'stretch'} justifyContent={'space-between'} spacing={1}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setStateIndex(states.indexOf(newValue));
        }}
        value={states[stateIndex] || null}
        renderInput={(params) =>
          <TextField {...params} label="مشاهده گام" />
        }
        options={states}
      />
      <CreateStateButton />
    </Stack>
  );
}

export default StatesMenu;