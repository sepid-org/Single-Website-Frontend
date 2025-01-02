import { Checkbox, Radio, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { ChoiceType, ChoiceVariantType } from 'commons/types/widgets';

type ChoiceViewPropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: any;
  variant: ChoiceVariantType;
  inactive: boolean;
}

const ChoiceView: FC<ChoiceViewPropsType> = ({
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
    <Stack direction={'row'} alignItems={'start'}>
      {variant === 'radio' ?
        <Radio disabled={choice.disabled} sx={{ marginTop: -1 }} size='small' checked={isSelected} onClick={onSelectionChangeWrapper} /> :
        <Checkbox disabled={choice.disabled} sx={{ marginTop: -1 }} size='small' checked={isSelected} onClick={onSelectionChangeWrapper} />
      }
      <Typography>
        {choice.text}
      </Typography>
    </Stack>
  );
};

export default ChoiceView;