import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import useMenuCourts from "./useMenuCourts";
import CourtCard from "../components/organisms/cards/Court";
import ExamCard from "../components/organisms/cards/Exam";
import WhatHappenedCard from "../components/organisms/cards/WhatHappened";

const useGetGameMenuComplementaryWidgets = () => {
  const { courts } = useMenuCourts();
  const complementaryObjects: ComplementaryObjectType[] = [
    {
      name: 'ashbaria-exam-card',
      substituteComponent: <ExamCard />,
    },
    {
      name: 'ashbaria-what-happened-card',
      substituteComponent: <WhatHappenedCard />,
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

export default useGetGameMenuComplementaryWidgets;