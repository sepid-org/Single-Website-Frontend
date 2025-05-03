import React, { FC, useState, useEffect, useCallback } from 'react';
import Layer from './Layer';
import Frame from 'commons/template/Board/Frame';
import { WidgetModes } from 'commons/components/organisms/Widget';
import useGetFSMState from 'apps/fsm/hooks/useGetFSMState';

export type PropsType = {
  fsmStateId: string;
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
  mode?: 'fit-height' | 'fit-width';
};

type BoardState = {
  displayPapers: string[];
  pendingPapers: string[];
  loadedSet: Set<string>;
};

const Board: FC<PropsType> = ({
  fsmStateId,
  parentWidth,
  parentHeight,
  boardWidth,
  boardHeight,
  mode,
}) => {
  const {
    fsmState,
    isSuccess: isStateSuccess,
    error: stateError,
  } = useGetFSMState({ fsmStateId });

  const [boardState, setBoardState] = useState<BoardState>({
    displayPapers: [],
    pendingPapers: [],
    loadedSet: new Set(),
  });

  // whenever FSM query returns new paper IDs, start “pending” phase
  useEffect(() => {
    if (isStateSuccess && fsmState?.papers) {
      setBoardState((prev) => ({
        ...prev,
        pendingPapers: fsmState.papers,
        loadedSet: new Set(),
      }));
    }
  }, [isStateSuccess, fsmState?.papers]);

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
    <Frame
      mode={mode}
      boardHeight={boardHeight}
      boardWidth={boardWidth}
      parentHeight={parentHeight}
      parentWidth={parentWidth}
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

      {stateError && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            color: 'red',
          }}
        >
          خطایی در بارگیری گام رخ داد!
        </div>
      )}
    </Frame>
  );
};

export default Board;