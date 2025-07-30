import React, { useState, createContext, FC, useContext, ReactNode } from 'react';
import { Dialog } from '@mui/material';
import { PlayerMinimalType } from 'commons/types/models';
import { useGetCurrentUserPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import useFSMStatesManager, { FSMStateResult } from 'apps/fsm/hooks/useFSMStatesManager';
import useFSMPapersManager, { PaperResult } from 'apps/fsm/hooks/useFSMPapersManager';
import { DynamicObjectsType } from 'commons/types/object/object';

interface FSMContextType {
  fsmId: number;
  player: PlayerMinimalType | undefined;
  openDialog: (children: ReactNode) => void;
  closeDialog: () => void;
  getCachedFSMState: (args: { fsmStateId: number }) => FSMStateResult;
  getCachedPaper: (args: { paperId: number }) => PaperResult;
  dynamicObjects: DynamicObjectsType;
  getDynamicObject: <P = any>(name: string) => React.ComponentType<P> | undefined;
}

const FSMContext = createContext<FSMContextType | null>(null);

interface FSMProviderPropsType {
  fsmId: number;
  children: ReactNode;
  mode?: 'view' | 'edit';
  dynamicObjects?: DynamicObjectsType;
}

export const FSMProvider: FC<FSMProviderPropsType> = ({
  children,
  dynamicObjects = {},
  ...props
}) => {
  const { data: player } = useGetCurrentUserPlayerQuery({ fsmId: props.fsmId }, { skip: props.mode === 'edit' });
  const { getCachedFSMState } = useFSMStatesManager({ fsmId: props.fsmId, mode: props.mode });
  const { getCachedPaper } = useFSMPapersManager({ fsmId: props.fsmId, mode: props.mode });
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    children: null,
  });
  const getDynamicObject = (name: string) => (dynamicObjects[name] as React.ComponentType<any>) || undefined;


  const openDialog = (
    children: ReactNode,
  ) => {
    setDialogProps({ children });
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const ctx: FSMContextType = {
    ...props,
    player,
    openDialog,
    closeDialog,
    getCachedFSMState,
    getCachedPaper,
    dynamicObjects,
    getDynamicObject,
  };

  return (
    <FSMContext.Provider value={ctx}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        {dialogProps.children}
      </Dialog>
    </FSMContext.Provider>
  );
};

// todo: add a loading state
export const useFSMContext = (): FSMContextType => {
  const ctx = useContext(FSMContext);
  if (!ctx) {
    throw new Error('useFSMContext must be used inside an <FSMProvider>');
  }
  return ctx;
};