import { CircularProgress } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { ChoicePropsType } from './types';
import { templates, ChoiceTemplateKey } from './templates';

type SwitcherProps = {
  template?: ChoiceTemplateKey;
} & ChoicePropsType;

const Choice: FC<SwitcherProps> = ({ template = 'classic', ...rest }) => {
  const Component = templates[template] ?? templates.classic;

  return (
    <Suspense fallback={<CircularProgress size={18} />}>
      <Component {...rest} />
    </Suspense>
  );
};

export default Choice;
