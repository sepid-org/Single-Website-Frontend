import React from "react";
import { ComplementaryObjectType } from "commons/types/object/object";
import CourtCard from "../components/organisms/cards/Court";
import ExamCard from "../components/organisms/cards/Exam";
import WhatHappenedCard from "../components/organisms/cards/WhatHappened";
import { useGetCourtsQuery } from "../redux/slices/GameLogics";

const useGetGameMenuComplementaryWidgets = () => {
  const { data: courts = [] } = useGetCourtsQuery();
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