import React from 'react';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import TextEditWidget from './edit';

export { TextEditWidget };

const TextWidget = ({ text }) => {
  return (
    <TinyPreview
      styles={{ width: '100%' }}
      content={text}
    />
  );
};

export default TextWidget;
