import React, { useState, createContext, FC, useContext, ReactNode } from 'react';
import { Dialog } from '@mui/material';
import { PlayerMinimalType } from 'commons/types/models';
import { useGetMyPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';

interface FSMContextType {
  fsmId: number;
  player: PlayerMinimalType;
  openDialog: (
    children: ReactNode,
  ) => void;
  closeDialog: () => void;
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
  const { data: player } = useGetMyPlayerQuery({ fsmId: props.fsmId });
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
    <FSMContext.Provider value={{ ...props, player, openDialog, closeDialog }}>
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
      openDialog: () => { },
      closeDialog: () => { },
    };
  }
  return context;
};