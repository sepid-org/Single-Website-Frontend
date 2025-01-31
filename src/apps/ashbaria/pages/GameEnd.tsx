import React, { FC, ReactNode, useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";

type PropsType = {
}

const GameEnd: FC<PropsType> = ({ }) => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${MediaUrls.WALL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth='sm' component={Paper}>
        <Grid container padding={4} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={12} sm={8}>
            <Stack spacing={2}>
              <Typography variant="h4" textAlign="center" lineHeight={1.5}>
                {'بازی تمام شد!'}
              </Typography>
              <Typography textAlign="center">
                {'منتظر اعلام نتایج از طرف ما باشید'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} container alignItems={'center'} justifyContent={'center'}>
            <Box
              component="img"
              src={MediaUrls.KOHSHAD}
              sx={{
                width: 180,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GameEnd;
