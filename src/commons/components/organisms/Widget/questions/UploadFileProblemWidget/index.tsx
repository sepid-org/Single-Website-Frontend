import { Button, IconButton, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from 'commons/components/organisms/Widget';
import UploadFileButton from 'commons/components/molecules/UploadFileButton';
import { AnswerType } from 'commons/types/models';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import { useClearQuestionAnswerMutation } from 'commons/redux/slices/cms/response/Answer';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type UploadFileProblemWidgetPropsType = {
  onAnswerChange: any;
  useSubmitAnswerMutation: any;

  id: number;
  text: string;
  answer_file: string;
  mode: WidgetModes;
  submittedAnswer: AnswerType;
} & QuestionWidgetType;

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  onAnswerChange,
  useSubmitAnswerMutation,

  id: questionId,
  text = 'محل بارگذاری فایل:',
  mode,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const t = useTranslate();
  const [fileLink, setFileLink] = useState<string>(submittedAnswer?.answer_file || '');
  const [clearQuestionAnswer, clearQuestionAnswerResult] = useClearQuestionAnswerMutation()
  const [submitAnswer, submitAnswerResult] = useSubmitAnswerMutation();
  const { playerId } = useFSMStateContext();

  useEffect(() => {
    if (fileLink) {
      onAnswerChange({ answer_file: fileLink });
      if (mode === WidgetModes.View) {
        submitAnswer({
          playerId,
          questionId,
          answerFile: fileLink,
        })
      }
    }
  }, [fileLink])

  const clearFile = (e) => {
    e.preventDefault();
    clearQuestionAnswer({ questionId });
  }

  useEffect(() => {
    if (clearQuestionAnswerResult.isSuccess) {
      setFileLink('');
      onAnswerChange({ answer_file: '' });
    }
  }, [clearQuestionAnswerResult])

  return (
    <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={1}>
      <IsRequired disabled={!questionWidgetProps.is_required}>
        <Typography>{text}</Typography>
      </IsRequired>
      <Stack justifyContent='flex-end' spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
          <UploadFileButton setFileLink={setFileLink} />
        }
        {(mode !== WidgetModes.Edit && mode !== WidgetModes.Disable && fileLink) &&
          <Button
            size="small"
            variant='outlined'
            sx={{
              whiteSpace: 'nowrap',
            }}
            endIcon={
              (mode !== WidgetModes.Review &&
                <IconButton size='small' onClick={clearFile}>
                  <ClearIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            href={fileLink}
            component="a"
            target="_blank">
            {'آخرین فایل ارسالی'}
          </Button>
        }
      </Stack>
      {mode === WidgetModes.Review && !fileLink &&
        <Typography color='red' variant='caption'>
          {'پاسخی برای این سوال ثبت نشده است.'}
        </Typography>
      }
    </Stack>
  );
};

export default UploadFileProblemWidget;

export { UploadFileProblemEditWidget };