import React, { FC, Fragment, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PaperListItem from "../atoms/PaperListItem";
import { useRemovePaperFromFSMStateMutation, useUpdatePaperOrderMutation } from "apps/fsm/redux/slices/fsm/FSMStateSlice";
import AreYouSure from "commons/components/organisms/dialogs/AreYouSure";

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

type PapersListPropsType = {
  paperIds: string[];
  fsmStateId: string;
}

const PapersList: FC<PapersListPropsType> = ({
  paperIds: initialPaperIds,
  fsmStateId,
}) => {
  const [paperIds, setPaperIds] = useState<string[]>([]);
  const [updatePapersOrder] = useUpdatePaperOrderMutation();
  const [removePaperFromFSMState] = useRemovePaperFromFSMStateMutation();
  const [paperToRemove, setPaperToRemove] = useState<string>(null);

  useEffect(() => {
    if (initialPaperIds) {
      setPaperIds(initialPaperIds);
    }
  }, [initialPaperIds])

  // Open the dialog for a specific paper
  const handleOpenRemovePaperDialog = (paperId) => {
    setPaperToRemove(paperId);
  };

  // Callback to remove paper when confirmed
  const handleRemovePaperFromFSMState = () => {
    if (paperToRemove) {
      removePaperFromFSMState({ paperId: paperToRemove, fsmStateId });
      setPaperToRemove(null); // Close the dialog after removal
    }
  };

  // Close dialog
  const handleCloseRemovePaperDialog = () => {
    setPaperToRemove(null);
  };

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
                <Fragment key={paperId}>
                  <Draggable draggableId={`paper-${paperId}`} index={index}>
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
                        <PaperListItem
                          isSelected={index === paperIds.length - 1}
                          paperId={paperId}
                          handleRemovePaperFromFSMState={() => handleOpenRemovePaperDialog(paperId)}
                        />
                      </div>
                    )}
                  </Draggable>
                  <AreYouSure
                    open={paperToRemove === paperId}
                    handleClose={handleCloseRemovePaperDialog}
                    callBackFunction={handleRemovePaperFromFSMState}
                  />
                </Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
}

export default PapersList;