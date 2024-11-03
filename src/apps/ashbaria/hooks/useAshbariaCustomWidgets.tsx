import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import DocumentsButton from "../components/molecules/buttons/Documents";
import HintsButton from "../components/molecules/buttons/Hints";
import FinishCourt from "../components/organisms/game-elements/FinishCourt";
import MyLastSupportPercentageInCourt from "../components/molecules/chips/MyLastSupportPercentageInCourt";
import MyLastScoreInCourt from "../components/molecules/chips/MyLastScoreInCourt";
import MyLastSupportPercentageChangeInCourt from "../components/molecules/chips/MyLastSupportPercentageChangeInCourt";
import MyTotalScore from "../components/molecules/chips/MyTotalScore";
import MyFullName from "../components/molecules/chips/MyFullName";
import useMenuCourts from "./useMenuCourts";
import CourtCard from "../components/organisms/cards/Court";

const useAshbariaCustomWidgets = () => {
  const { courts } = useMenuCourts();
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
      name: 'ashbaria-total-score',
      substituteComponent: <MyTotalScore />
    },
    {
      name: 'ashbaria-my-profile',
      substituteComponent: <MyFullName />,
    }
  ];
  
  courts.forEach(court => {
    complementaryObjects.push({
      name: `ashbaria-court-fsmId${court.corresponding_fsm}`,
      substituteComponent: <CourtCard court={court} />
    })
  })

  return {
    complementaryObjects,
  }
}

export default useAshbariaCustomWidgets;