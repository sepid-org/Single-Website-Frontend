import React, { useState, createContext, FC, useContext, ReactNode } from 'react';
import { Dialog } from '@mui/material';
import { PlayerMinimalType } from 'commons/types/models';
import { useGetCurrentUserPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import useFSMStatesManager, { FSMStateResult } from 'apps/fsm/hooks/useFSMStatesManager';
import useFSMPapersManager, { PaperResult } from 'apps/fsm/hooks/useFSMPapersManager';

interface FSMContextType {
  fsmId: number;
  player: PlayerMinimalType;
  openDialog: (
    children: ReactNode,
  ) => void;
  closeDialog: () => void;
  getCachedFSMState: ({ fsmStateId }: { fsmStateId: number }) => FSMStateResult;
  getCachedPaper: ({ paperId }: { paperId: number }) => PaperResult;
}

const FSMContext = createContext<FSMContextType | null>(null);

interface FSMProviderPropsType {
  fsmId: number;
  children: ReactNode;
}

export const FSMProvider: FC<FSMProviderPropsType> = ({
  children,
  ...props
}) => {
  const { data: player } = useGetCurrentUserPlayerQuery({ fsmId: props.fsmId });
  const { getCachedFSMState } = useFSMStatesManager({ fsmId: props.fsmId });
  const { getCachedPaper } = useFSMPapersManager({ fsmId: props.fsmId });
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    children: null,
  });

  const openDialog = (
    children: ReactNode,
  ) => {
    setDialogProps({ children });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <FSMContext.Provider value={{ ...props, player, openDialog, closeDialog, getCachedFSMState, getCachedPaper }}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        {dialogProps.children}
      </Dialog>
    </FSMContext.Provider>
  );
};

// todo: add a loading state
export const useFSMContext = (): FSMContextType => {
  const context = useContext(FSMContext);
  if (!context) {
    return {
      fsmId: undefined,
      player: undefined,
      openDialog: undefined,
      closeDialog: undefined,
      getCachedFSMState: undefined,
      getCachedPaper: undefined,
    };
  }
  return context;
};