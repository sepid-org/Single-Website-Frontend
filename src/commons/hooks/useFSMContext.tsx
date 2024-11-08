import React, { useState, createContext, FC, useContext, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { PlayerType } from 'commons/types/models';

interface FSMContextType {
  fsmId: number;
  player: PlayerType;
  openDialog: (
    children: ReactNode,
  ) => void;
  closeDialog: () => void;
}

const FSMContext = createContext<FSMContextType | null>(null);

interface FSMProviderPropsType {
  fsmId: number;
  player: PlayerType;
  children: ReactNode;
}

export const FSMProvider: FC<FSMProviderPropsType> = ({
  children,
  ...props
}) => {
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
    <FSMContext.Provider value={{ ...props, openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        {dialogProps.children}
      </Dialog>
    </FSMContext.Provider>
  );
};

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