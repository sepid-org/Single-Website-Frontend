import React, { createContext, FC, useContext, ReactNode } from 'react';
import { AnswerSheetType } from 'commons/types/models';

interface AnswerSheetContextType {
  answerSheet: AnswerSheetType;
}

const answerSheetContext = createContext<AnswerSheetContextType | null>(null);

interface AnswerSheetProviderPropsType extends AnswerSheetContextType {
  children: ReactNode;
}

export const AnswerSheetProvider: FC<AnswerSheetProviderPropsType> = ({
  children,
  ...props
}) => {
  return (
    <answerSheetContext.Provider value={{ ...props }}>
      {children}
    </answerSheetContext.Provider>
  );
};

export const useAnswerSheetContext = (): AnswerSheetContextType => {
  const context = useContext(answerSheetContext);
  if (!context) {
    return {
      answerSheet: undefined,
    };
  }
  return context;
};