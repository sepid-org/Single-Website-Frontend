import React, { FC } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { Button, Stack } from "@mui/material";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

type WhatHappenedPagePropsType = {};

const WhatHappenedPage: FC<WhatHappenedPagePropsType> = () => {
  const localNavigate = useLocalNavigate();

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Stack width={'80%'} alignItems={'start'} justifyContent={'center'} spacing={1}>
          <video
            width={'100%'}
            src="https://kamva-minio-storage.darkube.app/sepid/projects/ashbaria/what-happened.mp4"
            autoPlay
            controls
          />
          <Button variant="contained" onClick={() => localNavigate('/')}>
            {'حله...'}
          </Button>
        </Stack>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default WhatHappenedPage;
