import { FSMStateType } from 'commons/types/models';
import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMStateContextType {
  fsmStateId: string;
  isMentor?: boolean;
  teamId?: string;
  playerId?: string;
}

const FSMStateContext = createContext<FSMStateContextType | null>(null);

interface FSMStateProviderPropsType extends FSMStateContextType {
  children: ReactNode;
}

export const FSMStateProvider: FC<FSMStateProviderPropsType> = ({
  children,
  ...props
}) => {
  return (
    <FSMStateContext.Provider value={{ ...props }}>
      {children}
    </FSMStateContext.Provider>
  );
};

export const useFSMStateContext = (): FSMStateContextType => {
  const context = useContext(FSMStateContext);
  if (!context) {
    return {
      fsmStateId: '',
      isMentor: null,
      teamId: null,
      playerId: null,
    };
  }
  return context;
};
