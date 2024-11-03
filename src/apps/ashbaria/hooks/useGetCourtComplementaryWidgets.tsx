import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import DocumentsButton from "../components/molecules/buttons/Documents";
import HintsButton from "../components/molecules/buttons/Hints";
import FinishCourt from "../components/organisms/game-elements/FinishCourt";
import MyLastSupportPercentageInCourt from "../components/molecules/chips/MyLastSupportPercentageInCourt";
import MyLastScoreInCourt from "../components/molecules/chips/MyLastScoreInCourt";
import MyLastSupportPercentageChangeInCourt from "../components/molecules/chips/MyLastSupportPercentageChangeInCourt";
import MyFullName from "../components/molecules/chips/MyFullName";

const useGetCourtComplementaryWidgets = () => {

  const complementaryObjects: ComplementaryObjectType[] = [
    {
      name: 'ashbaria-finish-court',
      substituteComponent: <FinishCourt />
    },
    {
      name: 'ashbaria-documents-button',
      substituteComponent: <DocumentsButton />
    },
    {
      name: 'ashbaria-hints-button',
      substituteComponent: <HintsButton />
    },
    {
      name: 'ashbaria-last-support-percentage-change-in-fsm',
      substituteComponent: <MyLastSupportPercentageChangeInCourt />
    },
    {
      name: 'ashbaria-last-support-percentage-in-fsm',
      substituteComponent: <MyLastSupportPercentageInCourt />
    },
    {
      name: 'ashbaria-last-score-in-fsm',
      substituteComponent: <MyLastScoreInCourt />
    },
    {
      name: 'ashbaria-my-profile',
      substituteComponent: <MyFullName />,
    }
  ];

  return {
    complementaryObjects,
  }
}

export default useGetCourtComplementaryWidgets;