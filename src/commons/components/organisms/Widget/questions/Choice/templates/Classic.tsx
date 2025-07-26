import { Checkbox, Radio, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { ChoicePropsType } from '../types';

const Classic: FC<ChoicePropsType> = ({
  choice,
  isSelected,
  onSelectionChange,
  variant,
  inactive,
}) => {

  const onSelectionChangeWrapper = () => {
    if (!inactive && !choice.disabled) {
      onSelectionChange(choice);
    }
  }

  return (
    <Stack direction={'row'} alignItems={'center'} onClick={onSelectionChangeWrapper} sx={{ cursor: inactive || choice.disabled ? 'not-allowed' : 'pointer' }}>
      {variant === 'radio' ?
        <Radio disableRipple disabled={choice.disabled} size='small' checked={isSelected} /> :
        <Checkbox disableRipple disabled={choice.disabled} size='small' checked={isSelected} />
      }
      <Typography>
        {choice.text}
      </Typography>
    </Stack>
  );
};

export default Classic;