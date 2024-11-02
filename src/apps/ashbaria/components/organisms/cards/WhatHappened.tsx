import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import PlayIcon from "../../atoms/icons/Play";

type WhatHappenedCardPropsType = {}

const WhatHappenedCard: FC<WhatHappenedCardPropsType> = ({
}) => {
  const localNavigate = useLocalNavigate();

  const onClick = () => {
    localNavigate(`/what-happened/`)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={onClick}
    >
      <Stack width={'100%'} height={'100%'} component={Paper} alignItems={'center'} justifyContent={'center'} spacing={1} padding={1}>
        <PlayIcon />
        <Typography fontSize={12} fontWeight={600}>
          {'آنچه گذشت...'}
        </Typography>
      </Stack>
    </Box>
  )
}

export default WhatHappenedCard;