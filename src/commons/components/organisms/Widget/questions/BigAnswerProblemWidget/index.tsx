import { Button, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
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
    <Stack spacing={1}>
      <IsRequired hidden={!is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={questionText}
        />
      </IsRequired>
      {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
        <TinyEditorComponent
          content={answer}
          onChange={changeAnswer}
        />
      }
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
