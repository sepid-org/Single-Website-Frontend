import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import { WidgetModes } from 'commons/components/organisms/Widget';
import BigAnswerProblemEditWidget from './edit';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import { useFSMContext } from 'commons/hooks/useFSMContext';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = QuestionWidgetType;

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  useSubmitAnswerMutation,
  onAnswerChange,
  id: questionId,
  text,
  mode,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(submittedAnswer?.text || '');
  const [questionWidgetFields, setQuestionWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...questionWidgetProps });
  const [isButtonDisabled, setButtonDisable] = useState(false);
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { player } = useFSMContext();

  const onChangeWrapper = (val: string) => {
    if (mode === WidgetModes.InForm) {
      onAnswerChange({ text: val });
    };
    setAnswer(val);
  }

  const onSubmitWrapper = (e) => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    submitAnswer({ questionId, text: answer, playerId: player.id })
  }

  return (
    <Stack spacing={1}>
      <IsRequired hidden={!questionWidgetFields.is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={text}
        />
      </IsRequired>
      {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
        <TinyEditorComponent
          content={answer}
          onChange={onChangeWrapper}
        />
      }
      {mode === WidgetModes.View &&
        <Button
          disabled={isButtonDisabled}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={onSubmitWrapper}>
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
