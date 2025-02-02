import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import SmallAnswerProblemEditWidget from './edit';
import IsRequired from 'commons/components/atoms/IsRequired';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import useSmallAnswerQuestionProperties from './useSmallAnswerQuestionProperties';

type SmallAnswerProblemWidgetPropsType = {} & QuestionWidgetType;

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  onAnswerChange,
  useSubmitAnswerMutation,

  id: questionId,
  mode,
  text: questionText,
  is_required,
}) => {
  const t = useTranslate();

  const {
    answer,
    hasAnsweredCorrectly,
    hasAnswered,
    changeText,
    isQuestionLoading,
    submitAnswer,
  } = useSmallAnswerQuestionProperties({
    useSubmitAnswerMutation,
    onAnswerChange,
    questionId,
    mode,
  })

  return (
    <Fragment>
      <Stack spacing={1}>
        <IsRequired hidden={!is_required}>
          <TinyPreview
            styles={{ width: '100%' }}
            content={questionText}
          />
        </IsRequired>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='stretch'
          spacing={1}>
          {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
            <Fragment>
              <TextField
                fullWidth
                variant='outlined'
                value={answer}
                disabled={hasAnsweredCorrectly}
                error={hasAnswered && !hasAnsweredCorrectly}
                autoComplete='false'
                placeholder={'لطفاً پاسخ خود را وارد کنید.'}
                onChange={changeText}
                size='small'
              />
              {mode === WidgetModes.View &&
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={isQuestionLoading || hasAnsweredCorrectly}
                  onClick={submitAnswer}>
                  {t('submit')}
                </Button>
              }
            </Fragment>
          }
          {mode === WidgetModes.Review &&
            <Fragment>
              {answer ?
                <Typography>{answer}</Typography> :
                <Typography color='red' variant='caption'>
                  {'پاسخی برای این سوال ثبت نشده است.'}
                </Typography>
              }
            </Fragment>
          }
        </Stack>
      </Stack>
    </Fragment>
  );
};

export { SmallAnswerProblemEditWidget };
export default SmallAnswerProblemWidget;
