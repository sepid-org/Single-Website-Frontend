import React, { FC, Fragment, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FSMStatePapersListItem from "../atoms/FSMStatePapersListItem";
import { useUpdatePaperOrderMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result as string[];
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 8px 0`,

  // // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

type FSMStatePapersListPropsType = {
  paperIds: string[];
  fsmStateId: string;
}

const FSMStatePapersList: FC<FSMStatePapersListPropsType> = ({
  paperIds: initialPaperIds,
  fsmStateId,
}) => {
  const [paperIds, setPaperIds] = useState<string[]>([]);
  const [updatePapersOrder] = useUpdatePaperOrderMutation();

  useEffect(() => {
    if (initialPaperIds) {
      setPaperIds(initialPaperIds);
    }
  }, [initialPaperIds])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      paperIds,
      result.source.index,
      result.destination.index
    );
    updatePapersOrder({
      fsmStateId,
      paperIds: newItems,
    })
    setPaperIds(newItems);
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                padding: 8,
              }}
            >
              {paperIds.map((paperId, index) => (
                <Draggable key={paperId} draggableId={`paper-${paperId}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <FSMStatePapersListItem
                        isSelected={index === paperIds.length - 1}
                        fsmStateId={fsmStateId}
                        paperId={paperId}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
}

export default FSMStatePapersList;