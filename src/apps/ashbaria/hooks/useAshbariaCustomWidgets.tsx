import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import DocumentsButton from "../components/molecules/buttons/Documents";
import HintsButton from "../components/molecules/buttons/Hints";
import FinishCourt from "../components/organisms/chips/FinishCourt";

const useAshbariaCustomWidgets = () => {

  const complementaryObjects: ComplementaryObjectType[] = [
    {
      name: 'ashbaria-finish-court-4',
      substituteComponent: <FinishCourt fsmId={'4'} />
    },
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