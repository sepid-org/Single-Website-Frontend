import React, { FC, ReactNode, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";
import BaleIcon from "commons/components/atoms/icons/Bale";
import EitaaIcon from "commons/components/atoms/icons/Eitaa";
import useLocalNavigate from "../hooks/useLocalNavigate";

type PropsType = {
}

const GameEnd: FC<PropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
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
            <Stack spacing={3} alignItems="center">
              <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                بازی تمام شد!
              </Typography>

              <Stack spacing={1} alignItems="center">
                <Typography variant="body1" textAlign="center" color="textSecondary">
                  منتظر اعلام نتایج از طرف ما باشید
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EitaaIcon />
                  <Typography
                    variant="body1"
                    component="a"
                    href="https://eitaa.com/qandilsch"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    https://eitaa.com/qandilsch
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <BaleIcon />
                  <Typography
                    variant="body1"
                    component="a"
                    href="https://ble.ir/qandilsch"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    https://ble.ir/qandilsch
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1} alignItems="center">
                <Typography variant="body1" textAlign="center" color="textSecondary">
                  برای دریافت جوایز، تکمیل نمایه با{' '}
                  <Box component="span" fontWeight="bold" color="primary.main">
                    اطلاعات صحیح
                  </Box>{' '}
                  الزامی است
                </Typography>
                <Button fullWidth variant="contained" onClick={() => localNavigate('/profile/')}>
                  {'تکمیل نمایه'}
                </Button>
              </Stack>
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
