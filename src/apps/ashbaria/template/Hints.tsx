import { Card, Grid } from "@mui/material";
import { useGetFSMStatesQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import FSMVerticalCard from "commons/components/organisms/cards/FSMVerticalCard";
import React from "react";
import { useParams } from "react-router-dom";

const Hints = () => {
  const documents = [
    {

    },
    {

    },

    {

    },
    {

    },
    {

    },
  ];

  return (
    <Grid container spacing={2} padding={2} alignItems={'center'} justifyContent={'start'}>
      {documents.map((document, index) =>
        <Grid item key={index} xs={3}>
          <Card sx={{ padding: 0 }}>
            {'سلام'}
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default Hints;