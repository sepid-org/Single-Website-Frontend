import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMContextType {
  fsmStateId: string;
  isMentor: boolean;
  playerId: string;
  teamId: string;
}

const FSMContext = createContext<FSMContextType>(null);

interface FSMProviderPropsType extends FSMContextType {
  children: ReactNode;
}

export const FSMProvider: FC<FSMProviderPropsType> = ({
  children,
  ...props
}) => {
  return (
    <FSMContext.Provider value={{ ...props }}>
      {children}
    </FSMContext.Provider>
  );
};

export const useFSMContext = (): FSMContextType => {
  const context = useContext(FSMContext);
  if (!context) {
    throw new Error('useFSMContext must be used within an FSMProvider');
  }
  return context;
};