import { TextField, InputAdornment, Tooltip, IconButton, Checkbox } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChoiceType } from 'apps/ashbaria/types';

type ChoiceEditPropsType = {
  choice: ChoiceType;
  setChoice: (choice: ChoiceType) => void;
  onDelete: any;
}

const ChoiceEdit: FC<ChoiceEditPropsType> = ({
  choice,
  setChoice,
  onDelete,
}) => {

  return (
    <TextField
      multiline
      InputProps={{
        startAdornment:
          <InputAdornment position='start'>
            <Tooltip title='انتخاب به‌عنوان گزینه صحیح' arrow>
              <Checkbox
                size='small'
                checked={choice.is_correct}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setChoice({
                      ...choice,
                      is_correct: event.target.checked
                    })
                  }
                }
              />
            </Tooltip>
            <Tooltip title='انتخاب به‌عنوان تمام‌کننده دادگاه' arrow>
              <Checkbox
                size='small'
                checked={choice.is_finisher}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    setChoice({
                      ...choice,
                      is_finisher: event.target.checked
                    })
                  }
                }
              />
            </Tooltip>
          </InputAdornment>,
        endAdornment:
          <InputAdornment position='end'>
            <Tooltip title='حذف' arrow>
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
      }}
      fullWidth
      variant='standard'
      value={choice.text}
      onChange={(event) => {
        setChoice({
          ...choice,
          text: event.target.value,
        })
      }}
    />
  );
};

export default ChoiceEdit;