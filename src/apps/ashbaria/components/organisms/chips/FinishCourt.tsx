import { useFinishCourtMutation } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, useEffect } from "react";
import CustomPaper from "../../atoms/CustomPaper";

type FinishCourtPropsType = {
  fsmId: string;
}

const FinishCourt: FC<FinishCourtPropsType> = ({
  fsmId,
}) => {
  const [finishCourt, result] = useFinishCourtMutation();

  useEffect(() => {
    finishCourt({ fsmId });
  }, [])

  return (
    <CustomPaper>
      {'سلام!'}
    </CustomPaper>
  )
}

export default FinishCourt;