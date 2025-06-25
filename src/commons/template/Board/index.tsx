import React, { FC, useState, useEffect, useCallback } from 'react';
import Layer from './Layer';
import Viewport from 'commons/template/Board/Viewport';
import { WidgetModes } from 'commons/components/organisms/Widget';
import { ViewportType } from './types';

export type PropsType = ViewportType & {
  mode?: 'fit-height' | 'fit-width';
  paperIds: string[],
};

type BoardState = {
  displayPapers: string[];
  pendingPapers: string[];
  loadedSet: Set<string>;
};

const Board: FC<PropsType> = ({
  viewportWidth,
  viewportHeight,
  defaultSceneWidth,
  defaultSceneHeight,
  paperIds,
  mode,
}) => {

  const [boardState, setBoardState] = useState<BoardState>({
    displayPapers: [],
    pendingPapers: [],
    loadedSet: new Set(),
  });

  // whenever new paper IDs arrives, start “pending” phase
  useEffect(() => {
    setBoardState((prev) => ({
      ...prev,
      pendingPapers: paperIds,
      loadedSet: new Set(),
    }));
  }, [paperIds]);

  // callback we hand down to each hidden Layer
  const handleLoaded = useCallback(
    (paperId: string) => {
      setBoardState((prev) => ({
        ...prev,
        loadedSet: new Set(prev.loadedSet).add(paperId),
      }));
    },
    []
  );

  // once "all" pending paper‐IDs have loaded, flip to display them
  useEffect(() => {
    if (
      boardState.pendingPapers.length > 0 &&
      boardState.loadedSet.size === boardState.pendingPapers.length
    ) {
      setBoardState((prev) => ({
        displayPapers: prev.pendingPapers,
        pendingPapers: [],
        loadedSet: new Set(),
      }));
    }
  }, [boardState.loadedSet, boardState.pendingPapers]);

  return (
    <Viewport
      mode={mode}
      viewportWidth={viewportWidth}
      viewportHeight={viewportHeight}
      defaultSceneWidth={defaultSceneWidth}
      defaultSceneHeight={defaultSceneHeight}
    >
      {/* show the old/displayed papers */}
      {boardState.displayPapers.map((paperId) => (
        <Layer
          key={paperId}
          paperId={paperId}
          widgetsMode={WidgetModes.View}
        />
      ))}

      {/* concurrently mount the “new” pending papers in hidden mode */}
      {boardState.pendingPapers.map((paperId) => (
        <Layer
          key={paperId}
          paperId={paperId}
          widgetsMode={WidgetModes.View}
          hidden
          onLoaded={() => handleLoaded(paperId)}
        />
      ))}
    </Viewport>
  );
};

export default Board;