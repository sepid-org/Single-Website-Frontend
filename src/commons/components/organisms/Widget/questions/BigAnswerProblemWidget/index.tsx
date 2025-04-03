import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import BigAnswerProblemEditWidget from './edit';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useLongAnswerQuestionProperties from './useLongAnswerQuestionProperties copy';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = {} & QuestionWidgetType;

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  id: questionId,
  text: questionText,
  mode,
  is_required,
  ...widgetProps
}) => {
  const t = useTranslate();

  const {
    answer,
    changeAnswer,
    submitAnswer,
    isQuestionLoading,
    errorMessage,
  } = useLongAnswerQuestionProperties({
    useSubmitAnswerMutation,
    onAnswerChange,
    questionId,
    mode,
  })
  return (
    <Stack 
      spacing={1}
      visibility={widgetProps.is_hidden && mode === 1 ? 'hidden' : 'visible'}
      sx={{opacity: (widgetProps.is_hidden && mode === 2 ? 0.2 : 1)}}
    >
      <IsRequired hidden={!is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={questionText}
        />
      </IsRequired>
      {/*(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
        <TinyEditorComponent
          content={answer}
          onChange={changeAnswer}
        />
      */}
      <TextField
        multiline
        rows={3}
        placeholder={'پاسخ خود را وارد کنید.'}
        value={answer || ''}
        onChange={(e) => changeAnswer(e.target.value)}
      />
      {mode === WidgetModes.View &&
        <Button
          disabled={isQuestionLoading}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={submitAnswer}>
          {t('submitAnswer')}
        </Button>
      }
      {mode === WidgetModes.Review &&
        <Fragment>
          {answer ?
            <TinyPreview
              styles={{ width: '100%' }}
              content={answer}
            /> :
            <Typography color='red' variant='caption'>
              {'پاسخی برای این سوال ثبت نشده است.'}
            </Typography>
          }
        </Fragment>
      }
    </Stack>
  );
};

export default BigAnswerProblemWidget;
