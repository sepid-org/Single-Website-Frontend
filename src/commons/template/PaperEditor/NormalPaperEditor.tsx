import { Stack } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { WidgetType } from 'commons/types/widgets/widget';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';

type NormalPaperEditorPropsType = {
  paperId: string;
  mode?: 'contents' | 'problems' | 'all';
}

const NormalPaperEditor: FC<NormalPaperEditorPropsType> = ({
  paperId,
  mode = 'all',
}) => {
  const t = useTranslate();
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  let widgets: WidgetType[];
  if (mode === 'all') {
    widgets = paper?.widgets;
  } else if (mode === 'contents') {
    widgets = paper?.widgets.filter(
      (widget) => !widget.widget_type.includes('Problem')
    );
  } else if (mode === 'problems') {
    widgets = paper?.widgets.filter(
      (widget) => widget.widget_type.includes('Problem')
    );
  }

  return (
    <Fragment>
      <Stack spacing={4} justifyContent="center">
        {(widgets && widgets.length === 0) ?
          <NoDataFound variant={4} message={'ویجتی وجود ندارد'} /> :
          <Fragment>
            {widgets?.map((widget, index) => (
              <Widget
                key={widget.id}
                paperId={paperId}
                widget={widget}
                mode={WidgetModes.Edit}
              />
            ))}
          </Fragment>
        }
        <CreateWidgetButton mode={mode} paperId={paperId} />
      </Stack>
    </Fragment>
  );
}

export default NormalPaperEditor;
