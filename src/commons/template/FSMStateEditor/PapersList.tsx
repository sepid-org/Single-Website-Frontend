import React, { FC, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PaperListItem from "./PaperListItem";
import { useUpdatePaperOrderMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
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

type PapersListPropsType = {
  paperIds: string[];
  fsmStateId: string;
}

const PapersList: FC<PapersListPropsType> = ({
  paperIds: initialPaperIds,
  fsmStateId,
}) => {
  const [paperIds, setPaperIds] = useState<any[]>(initialPaperIds);
  const [updatePapersOrder, result] = useUpdatePaperOrderMutation();



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
      paperIds: newItems as any,
    })

    setPaperIds(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              width: 300,
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
                      provided.draggableProps.style
                    )}
                  >
                    <PaperListItem paperId={paperId} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PapersList;