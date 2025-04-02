import { Button, IconButton, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC } from 'react';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from 'commons/components/organisms/Widget';
import FileUploadButton from 'commons/components/molecules/UploadFileButton';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useUploadFileQuestionProperties from './useUploadFileQuestionProperties';

type UploadFileProblemWidgetPropsType = {
  onAnswerChange: any;
  useSubmitAnswerMutation: any;

  id: number;
  text: string;
  answer_file: string;
  mode: WidgetModes;
} & QuestionWidgetType;

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  onAnswerChange,
  useSubmitAnswerMutation,

  id: questionId,
  text = 'محل بارگذاری فایل:',
  mode,
  ...questionWidgetProps
}) => {

  const {
    uploadedFileLink,
    setUploadedFileLink,
    clearFile,
    errorMessage,
    isQuestionLoading,
  } = useUploadFileQuestionProperties({
    useSubmitAnswerMutation,
    onAnswerChange,
    questionId,
    mode,
  });

  return (
    <Stack
      alignItems='center'
      justifyContent='space-between'
      direction='row'
      spacing={1}
      visibility={questionWidgetProps.is_hidden && mode === 1 ? 'hidden' : 'visible'}
      sx={{ opacity: (questionWidgetProps.is_hidden && mode === 2 ? 0.2 : 1) }}
    >
      <IsRequired hidden={!questionWidgetProps.is_required}>
        <Typography>{text}</Typography>
      </IsRequired>
      <Stack justifyContent='flex-end' spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InForm) &&
          <FileUploadButton setFileLink={setUploadedFileLink} />
        }
        {(mode !== WidgetModes.Edit && mode !== WidgetModes.Disable && uploadedFileLink) &&
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
            href={uploadedFileLink}
            component="a"
            target="_blank">
            {'آخرین فایل ارسالی'}
          </Button>
        }
      </Stack>
      {mode === WidgetModes.Review && !uploadedFileLink &&
        <Typography color='red' variant='caption'>
          {'پاسخی برای این سوال ثبت نشده است.'}
        </Typography>
      }
    </Stack>
  );
};

export default UploadFileProblemWidget;

export { UploadFileProblemEditWidget };