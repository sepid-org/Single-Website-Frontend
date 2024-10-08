import React, { useState, useEffect, useRef, useMemo, Fragment, FC, useCallback } from 'react';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { Stack } from '@mui/material';
import ObjectWrapper from 'commons/components/organisms/ObjectWrapper';
import { ObjectLogicType } from 'commons/types/models';

export type BoardPaperPropsType = {
  paperId: string;
  fsmStateId?: string;
  objectLogics?: ObjectLogicType[];
}

const BoardPaper: FC<BoardPaperPropsType> = ({
  paperId,
  fsmStateId,
  objectLogics = [],
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  const widgets = [...paper?.widgets || []].sort((w1, w2) => (parseInt(w1.order) - parseInt(w2.order)));

  const widgetsComponents =
    widgets.map((widget, index) => {
      const objectLogic = objectLogics.find(objectLogic => objectLogic.name === widget.name)
      return (
        <div
          key={widget.id}
          style={{
            position: 'absolute',
            left: widget.position?.x !== undefined ? widget.position.x : index * 10,
            top: widget.position?.y !== undefined ? widget.position?.y : index * 10,
            width: widget.position?.width || 100,
            height: widget.position?.height || 100,
          }}
        >
          <ObjectWrapper logic={objectLogic}>
            {objectLogic?.substituteComponent ||
              <Widget fsmStateId={fsmStateId} coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.View} />
            }
          </ObjectWrapper>
        </div>)
    })



  return (
    <Fragment>
      {widgetsComponents}
    </Fragment>
  );
};

export default BoardPaper;