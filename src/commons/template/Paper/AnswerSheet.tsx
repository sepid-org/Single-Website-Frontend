import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import Widget from 'commons/components/organisms/Widget';
import { AnswerType } from 'commons/types/models';
import usePaper from 'apps/fsm/hooks/usePaper';

export type AnswerSheetPaperPropsType = {
  mode: 'answer_sheet';
  paperId: string;
  answers: AnswerType[];
}

const AnswerSheetPaper: FC<AnswerSheetPaperPropsType> = ({
  paperId,
  answers,
}) => {
  const { paper } = usePaper(parseInt(paperId));
  const visibleWidgets = paper?.widgets.filter(widget => !widget.is_hidden)

  return (
    <Fragment>
      {visibleWidgets?.map((widget) => (
        <Widget
          submittedAnswer={answers?.find(answer => answer.problem === widget.id)}
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.Review}
          coveredWithPaper={false}
          widget={widget} />
      ))}
    </Fragment>
  );
};

export default AnswerSheetPaper;
