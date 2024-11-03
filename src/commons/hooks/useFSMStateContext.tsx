import WIDGET_REGISTRY, { WidgetRegistryType } from 'commons/components/organisms/Widget/useWidgetFactory/WidgetTypeMapper';
import { ComplementaryObjectType } from 'commons/types/object/object';
import React, { createContext, FC, useContext, ReactNode } from 'react';

interface FSMStateContextType {
  fsmStateId: string;
  isMentor?: boolean;
  teamId?: string;
  playerId?: string;
  widgetRegistry?: WidgetRegistryType;
  complementaryObjects?: ComplementaryObjectType[];
}

const FSMStateContext = createContext<FSMStateContextType | null>(null);

interface FSMStateProviderPropsType extends FSMStateContextType {
  children: ReactNode;
}

export const FSMStateProvider: FC<FSMStateProviderPropsType> = ({
  children,
  widgetRegistry: providedWidgetRegistry,
  ...props
}) => {
  return (
    <FSMStateContext.Provider
      value={{
        ...props,
        widgetRegistry: providedWidgetRegistry
      }}
    >
      {children}
    </FSMStateContext.Provider>
  );
};

export const useFSMStateContext = (): FSMStateContextType => {
  const context = useContext(FSMStateContext);
  if (!context) {
    return {
      fsmStateId: '',
      isMentor: undefined,
      teamId: undefined,
      playerId: undefined,
      widgetRegistry: WIDGET_REGISTRY,
      complementaryObjects: [],
    };
  }

  // Return context with default widget registry if not provided
  return {
    ...context,
    widgetRegistry: context.widgetRegistry ?? WIDGET_REGISTRY,
  };
};