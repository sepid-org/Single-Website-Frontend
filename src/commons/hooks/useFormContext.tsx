import React, { useState, createContext, FC, useContext, ReactNode } from 'react';
import { Dialog } from '@mui/material';

interface FormContextType {
  formId: number;
  openDialog: (
    children: ReactNode,
  ) => void;
  closeDialog: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

interface FormProviderPropsType {
  formId: number;
  children: ReactNode;
}

export const FormProvider: FC<FormProviderPropsType> = ({
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
    <FormContext.Provider value={{ ...props, openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        {dialogProps.children}
      </Dialog>
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    return {
      formId: undefined,
      openDialog: () => { },
      closeDialog: () => { },
    };
  }
  return context;
};