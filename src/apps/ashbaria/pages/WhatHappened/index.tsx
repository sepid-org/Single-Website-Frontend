import React, { FC } from "react";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { Button, Stack } from "@mui/material";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";

type WhatHappenedPagePropsType = {};

const WhatHappenedPage: FC<WhatHappenedPagePropsType> = () => {
  const localNavigate = useLocalNavigate();

  return (
    <FullScreenBackgroundImage image={MediaUrls.WALL} styles={{ padding: 2 }}>
      <Stack spacing={1} width={'100%'} alignItems={'end'} justifyContent={'center'} direction={'row'}>
        <Stack width={'60%'} alignItems={'start'} justifyContent={'center'} spacing={1}>
          <video
            style={{ borderRadius: 8 }}
            width={'100%'}
            src={MediaUrls.WHAT_HAPPENED}
            autoPlay
            controls
          />
        </Stack>
        <Button sx={{}} variant="contained" onClick={() => localNavigate('/menu/')} size='large'>
          {'بزن بریم...'}
        </Button>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default WhatHappenedPage;
