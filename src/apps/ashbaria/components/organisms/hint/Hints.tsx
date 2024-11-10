import React, { FC, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Hint from "./Hint";
import { useGetHintsByObjectIdQuery } from "commons/redux/apis/cms/hint/GeneralHint";

type HintsPropsType = {
  targetObjectId: number;
}

const Hints: FC<HintsPropsType> = ({ targetObjectId }) => {
  const { data: hints } = useGetHintsByObjectIdQuery(targetObjectId, { skip: !Boolean(targetObjectId) })
  const [selectedHintId, setSelectedHintId] = useState<number>(null);

  useEffect(() => {
    if (hints?.length === 1) {
      setSelectedHintId(hints[0].id);
    }
  }, [hints])

  if (selectedHintId) {
    return (
      <Hint onClose={() => setSelectedHintId(null)} hint={hints.find(hint => hint.id === selectedHintId)} />
    )
  }

  return (
    <Grid container spacing={2} padding={2} alignItems={'center'} justifyContent={'start'}>
      {hints?.map(hint =>
        <Grid item key={hint.id} xs={3}>
          <Button onClick={() => setSelectedHintId(hint.id)}>
            {hint.title}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Hints;