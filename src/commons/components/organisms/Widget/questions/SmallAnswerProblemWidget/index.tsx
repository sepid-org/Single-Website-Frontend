import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import SmallAnswerProblemEditWidget from './edit';
import IsRequired from 'commons/components/atoms/IsRequired';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import useSmallAnswerQuestionProperties from './useSmallAnswerQuestionProperties';

type SmallAnswerProblemWidgetPropsType = {
  useSubmitAnswerMutation: any;
  on: any;

  id: number;
  mode: WidgetModes;
  text: string;
  correct_answer: any;
} & QuestionWidgetType;

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  onAnswerChange,
  useSubmitAnswerMutation,

  id: questionId,
  mode,
  text: problemText,
  ...questionWidgetProps
}) => {
  const t = useTranslate();

  const {
    answer,
    errorMessage,
    submitAnswer: submitAnswerWrapper,
    submitAnswerResult,
    onAnswerChange: onAnswerChangeWrapper,
  } = useSmallAnswerQuestionProperties({
    questionId,
    onAnswerChange,
    useSubmitAnswerMutation,
    mode,
  })

  return (
    <Fragment>
      <Stack spacing={1}>
        <IsRequired disabled={!questionWidgetProps.is_required}>
          <TinyPreview
            styles={{ width: '100%' }}
            content={problemText}
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
                disabled={Boolean(errorMessage)}
                error={Boolean(errorMessage)}
                autoComplete='false'
                placeholder={'لطفاً پاسخ خود را وارد کنید.'}
                onChange={onAnswerChangeWrapper}
                size='small'
              />
              {mode === WidgetModes.View &&
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={Boolean(errorMessage)}
                  onClick={submitAnswerWrapper}>
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
