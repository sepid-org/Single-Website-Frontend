import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import Widget from 'commons/components/organisms/Widget';
import { AnswerType } from 'commons/types/models';
import { GetAnswerCollectorType } from 'commons/hooks/useCollectWidgetsAnswers';
import { WidgetType } from 'commons/types/widgets/widget';
import usePaper from 'apps/fsm/hooks/usePaper';

export type FormPaperPropsType = {
  mode: 'form';
  paperId: string;
  widgets_type?: 'contents' | 'problems' | 'all';
  answers?: AnswerType[];
  getAnswerCollector: GetAnswerCollectorType;
}

const FormPaper: FC<FormPaperPropsType> = ({
  paperId,
  widgets_type = 'all',
  answers = [],
  getAnswerCollector,
}) => {
  const { paper } = usePaper(parseInt(paperId));

  let widgets: WidgetType[];
  if (widgets_type === 'all') {
    widgets = paper?.widgets;
  } else if (widgets_type === 'contents') {
    widgets = paper?.widgets.filter(
      (widget) => !widget.widget_type.includes('Problem')
    );
  } else if (widgets_type === 'problems') {
    widgets = paper?.widgets.filter(
      (widget) => widget.widget_type.includes('Problem')
    );
  }
  widgets = widgets || [];
  const visibleWidgets = widgets.filter(widget => !widget.is_hidden)

  return (
    <Fragment>
      {visibleWidgets.map((widget) => (
        <Widget
          collectAnswer={getAnswerCollector({ widgetId: widget.id, widgetType: widget.widget_type })}
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.InForm}
          coveredWithPaper={false} widget={widget} />
      ))}
    </Fragment>
  );
};

export default FormPaper;
