import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMContextType {
  fsmId: string;
}

const FSMContext = createContext<FSMContextType | null>(null);

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
    return {
      fsmId: '',
    };
  }
  return context;
};
