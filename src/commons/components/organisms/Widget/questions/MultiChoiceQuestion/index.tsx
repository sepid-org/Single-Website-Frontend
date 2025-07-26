import React, { FC, Suspense } from 'react';
import { templates, TemplateKey } from './templates';
import { MultiChoiceQuestionWidgetPropsType } from './types';
import MultiChoiceQuestionEditor from './editor';
import { CircularProgress } from '@mui/material';

type SwitcherProps = {
  template?: TemplateKey;
} & MultiChoiceQuestionWidgetPropsType;

const MultiChoiceQuestion: FC<SwitcherProps> = ({ template = 'classic', ...rest }) => {
  const SelectedTemplate = templates[template] ?? templates.classic;

  return (
    <Suspense fallback={<CircularProgress size={18} />}>
      <SelectedTemplate {...rest} />
    </Suspense>
  );
};

export default MultiChoiceQuestion;
export { MultiChoiceQuestionEditor };