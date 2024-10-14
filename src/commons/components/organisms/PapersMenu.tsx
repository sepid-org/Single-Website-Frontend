import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import React, { FC } from 'react';

import { PaperType } from 'commons/types/models';
import CreateStateButton from '../atoms/CreateStateButton';

type PapersMenuPropsType = {
  currentPaperId: string;
  setCurrentPaperId: any;
  papers: PaperType[];
}

const PapersMenu: FC<PapersMenuPropsType> = ({
  currentPaperId,
  setCurrentPaperId,
  papers = [],
}) => {

  return (
    <Stack direction={'row'} alignContent={'stretch'} justifyContent={'space-between'} spacing={1}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setCurrentPaperId(papers.indexOf(newValue));
        }}
        value={papers[currentPaperId] || null}
        renderInput={(params) =>
          <TextField {...params} label="مشاهده لایه" />
        }
        options={papers}
      />
      <Button variant='contained'>
        {'افزودن لایه'}
      </Button>
    </Stack>
  );
}

export default PapersMenu;