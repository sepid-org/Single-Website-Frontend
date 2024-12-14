import React, { FC } from 'react';

import { useGetReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import Paper from './Paper';
import { AnswerSheetProvider } from 'commons/hooks/useAnswerSheetContext';

type AnswerSheetPaperPropsType = {
  answerSheetId: string;
}

const AnswerSheet: FC<AnswerSheetPaperPropsType> = ({
  answerSheetId,
}) => {
  const { data: receipt } = useGetReceiptQuery({ receiptId: answerSheetId });

  return (
    <AnswerSheetProvider answerSheet={receipt}>
      <Paper mode='answer_sheet' paperId={receipt?.form} answers={receipt?.answers} />
    </AnswerSheetProvider>
  );
};

export default AnswerSheet;
