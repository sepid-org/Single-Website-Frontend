import { FSMStateType } from 'commons/types/models';
import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMStateContextType {
  fsmStateId: string;
  isMentor?: boolean;
  teamId?: string;
  playerId?: string;

}

const FSMStateContext = createContext<FSMStateContextType>(null);

interface FSMProviderPropsType extends FSMStateContextType {
  children: ReactNode;
}

export const FSMStateProvider: FC<FSMProviderPropsType> = ({
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
    throw new Error('useFSMStateContext must be used within an FSMStateProvider');
  }
  return context;
};