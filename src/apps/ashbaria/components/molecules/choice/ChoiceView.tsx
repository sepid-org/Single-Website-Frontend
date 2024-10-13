import { Checkbox, Radio, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { ChoiceType } from 'apps/ashbaria/types';

type ChoiceViewPropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: any;
  disabled: boolean;
}

const ChoiceView: FC<ChoiceViewPropsType> = ({
  choice,
  isSelected,
  onSelectionChange,
  disabled,
}) => {

  return (
    <Stack direction={'row'} alignItems={'start'}>
      <Checkbox disabled={disabled} sx={{ marginTop: -1 }} size='small' checked={isSelected} onClick={() => onSelectionChange(choice)} />
      <Typography>
        {choice.text}
      </Typography>
    </Stack>
  );
};

export default ChoiceView;