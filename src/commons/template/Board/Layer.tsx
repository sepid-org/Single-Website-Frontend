import React, { FC, useMemo, useEffect } from 'react';
import useGetPaper from 'apps/fsm/hooks/useFSMPapersManager';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import ObjectWrapper from 'commons/components/organisms/ObjectWrapper';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import { useFSMContext } from 'commons/hooks/useFSMContext';

export type LayerProps = {
  paperId: string;
  widgetsMode: WidgetModes;
  /* if true, we mount hidden (to pre-load data) */
  hidden?: boolean;
  /* called once when this paper’s data has arrived */
  onLoaded?: () => void;
};

const Layer: FC<LayerProps> = ({
  paperId,
  widgetsMode,
  hidden = false,
  onLoaded,
}) => {
  const { useGetPaper } = useFSMContext();
  const { paper, isSuccess } = useGetPaper({ paperId: parseInt(paperId) });
  const { complementaryObjects } = useFSMStateContext();
  const widgets = paper?.widgets || [];

  // notify parent when data arrives
  useEffect(() => {
    if (isSuccess && paper) {
      onLoaded?.();
    }
  }, [isSuccess, paper]);

  const widgetsComponents = useMemo(
    () =>
      widgets.map((widget, index) => {
        const complementaryObject = complementaryObjects?.find(
          (co) => co.name === widget.name
        );
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
              {complementaryObject?.substituteComponent || (
                <Widget
                  coveredWithPaper={false}
                  widget={widget}
                  paperId={paperId}
                  mode={widgetsMode}
                />
              )}
            </ObjectWrapper>
          </div>
        );
      }),
    [widgets, complementaryObjects, paperId, widgetsMode]
  );

  return (
    <div
      style={
        hidden
          ? {
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
          }
          : undefined
      }
    >
      {widgetsComponents}
    </div>
  );
};

export default Layer;