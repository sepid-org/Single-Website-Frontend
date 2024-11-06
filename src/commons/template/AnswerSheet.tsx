import React, { FC } from 'react';

import { useGetReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import Paper from './Paper';

type AnswerSheetPaperPropsType = {
  answerSheetId: string;
}

const AnswerSheet: FC<AnswerSheetPaperPropsType> = ({
  answerSheetId,
}) => {
  const { data: receipt } = useGetReceiptQuery({ receiptId: answerSheetId });

  return (
    <Paper mode='answer_sheet' paperId={receipt?.form} answers={receipt?.answers} />
  );
};

export default AnswerSheet;
