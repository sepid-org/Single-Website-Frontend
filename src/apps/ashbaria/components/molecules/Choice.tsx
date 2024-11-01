import { Paper, Stack, styled, Typography } from '@mui/material';
import React, { FC } from 'react';
import { ChoiceType } from 'commons/types/widgets';

const ChoicePaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'disabled',
})<{ isSelected: boolean; disabled: boolean }>(({ theme, isSelected, disabled }) => ({
  position: 'relative',
  width: '100%',
  padding: theme.spacing(1),
  borderRadius: 12,
  borderBottomLeftRadius: 0,
  boxShadow: '0px 4px 4px 0px #00000040',
  background: isSelected
    ? 'linear-gradient(90deg, #FFEC88 100%, #FFF2D1 100%)'
    : 'linear-gradient(90deg, #E0E2FB 0%, #FFFFFF 100%)',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
  overflow: 'hidden', // To clip the pseudo-element within rounded corners

  // Pseudo-element for gradient border
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    padding: '2px', // Adjust the thickness of the border
    background: isSelected ? 'linear-gradient(180deg, #FE9C42 0%, #E25100 100%)' : 'transparent',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', // Keeps the inner area transparent
    WebkitMaskComposite: 'destination-out', // Ensures the inner content shows through
    pointerEvents: 'none',
  },
}));

type ChoicePropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: () => void;
  disabled: boolean;
}

const Choice: FC<ChoicePropsType> = ({
  choice,
  isSelected,
  onSelectionChange,
  disabled,
}) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'start'}
      component={ChoicePaper}
      isSelected={isSelected}
      disabled={disabled}
      onClick={!disabled ? onSelectionChange : undefined}
    >
      <Typography color={'black'}>
        {choice.text}
      </Typography>
    </Stack>
  );
};

export default Choice;
