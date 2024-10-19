import { Grid } from "@mui/material";
import React from "react";
import CustomPaper from "../components/atoms/CustomPaper";

const Documents = () => {
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
        <Grid item key={index} xs={3} height={400}>
          <CustomPaper>
            {'سلام'}
          </CustomPaper>
        </Grid>
      )}
    </Grid>
  )
}

export default Documents;