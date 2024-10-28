import WIDGET_TYPE_MAPPER from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMStateContextType {
  fsmStateId: string;
  isMentor?: boolean;
  teamId?: string;
  playerId?: string;
  WIDGET_TYPE_MAPPER?: any;
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
      WIDGET_TYPE_MAPPER: WIDGET_TYPE_MAPPER,
    };
  }
  return context;
};
