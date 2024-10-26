import React, { FC, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useGetFSMStateHintsQuery } from "apps/website-display/redux/features/hint/HintSlice";
import Hint from "./Hint";

type HintsPropsType = {
  referenceId: string;
}

const Hints: FC<HintsPropsType> = ({
  referenceId,
}) => {
  const { data: hints } = useGetFSMStateHintsQuery({ fsmStateId: referenceId }, { skip: !Boolean(referenceId) });
  const [selectedHintId, setSelectedHinId] = useState<string>(null);

  useEffect(() => {
    if (hints?.length === 1) {
      setSelectedHinId(hints[0].id);
    }
  }, [hints])

  if (selectedHintId) {
    return (
      <Hint onClose={() => setSelectedHinId(null)} hintId={selectedHintId} />
    )
  }

  return (
    <Grid container spacing={2} padding={2} alignItems={'center'} justifyContent={'start'}>
      {hints?.map(hint =>
        <Grid item key={hint.id} xs={3}>
          <Button onClick={() => setSelectedHinId(hint.id)}>
            {"hint.id"}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Hints;