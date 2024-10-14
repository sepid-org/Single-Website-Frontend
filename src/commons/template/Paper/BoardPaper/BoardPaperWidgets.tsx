import React, { FC, useMemo } from 'react';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import ObjectWrapper from 'commons/components/organisms/ObjectWrapper';
import { ComplementaryObjectType } from 'commons/types/models';

export type BoardPaperWidgetsPropsType = {
  paperId: string;
  complementaryObjects?: ComplementaryObjectType[];
  mode: WidgetModes;
}

const BoardPaperWidgets: FC<BoardPaperWidgetsPropsType> = ({
  paperId,
  complementaryObjects = [],
  mode,
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  const widgets = useMemo(() =>
    [...paper?.widgets || []].sort((w1, w2) => (parseInt(w1.order) - parseInt(w2.order))),
    [paper?.widgets]
  );

  const widgetsComponents = useMemo(() =>
    widgets.map((widget, index) => {
      const complementaryObject = complementaryObjects.find(complementaryObject => complementaryObject.name === widget.name);
      return (
        <div
          key={widget.id}
          style={{
            position: 'absolute',
            left: widget.position?.x ?? index * 10,
            top: widget.position?.y ?? index * 10,
            width: widget.position?.width || 100,
            height: widget.position?.height || 100,
          }}
        >
          <ObjectWrapper complementaryObject={complementaryObject}>
            {complementaryObject?.substituteComponent ||
              <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={mode} />}
          </ObjectWrapper>
        </div>
      );
    }),
    [widgets, complementaryObjects, paperId]
  );

  return <>{widgetsComponents}</>;
};

export default React.memo(BoardPaperWidgets);