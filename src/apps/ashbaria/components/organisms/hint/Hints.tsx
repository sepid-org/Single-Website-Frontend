import React, { FC, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Hint from "./Hint";
import { useGetHintsByObjectIdQuery } from "commons/redux/apis/cms/hint/GeneralHint";
import { PublicGeneralHint } from "commons/types/models";

type HintsPropsType = {
  targetObjectId: number;
}

const Hints: FC<HintsPropsType> = ({ targetObjectId }) => {
  const { data: hints } = useGetHintsByObjectIdQuery(targetObjectId, { skip: !Boolean(targetObjectId) })
  const [selectedHint, setSelectedHint] = useState<PublicGeneralHint>(null);

  useEffect(() => {
    if (hints?.length === 1) {
      setSelectedHint(hints[0]);
    }
  }, [hints])

  if (selectedHint) {
    return (
      <Hint onClose={() => setSelectedHint(null)} hint={selectedHint} />
    )
  }

  return (
    <Grid container spacing={2} padding={2} alignItems={'center'} justifyContent={'start'}>
      {hints?.map(hint =>
        <Grid item key={hint.object_id} xs={3}>
          <Button onClick={() => setSelectedHint(hint)}>
            {hint.title}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Hints;