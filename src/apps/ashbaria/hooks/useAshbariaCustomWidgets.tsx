import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import DocumentsButton from "../components/molecules/buttons/DocumentsButton";
import HintsButton from "../components/molecules/buttons/HintsButton";

const useAshbariaCustomWidgets = () => {

  const complementaryObjects: ComplementaryObjectType[] = [
    {
      name: 'ashbaria-documents-button',
      substituteComponent: <DocumentsButton />
    },
    {
      name: 'ashbaria-hints-button',
      substituteComponent: <HintsButton />
    }
  ];

  return {
    complementaryObjects,
  }
}

export default useAshbariaCustomWidgets;