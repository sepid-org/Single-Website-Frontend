import { Stack, Paper, Typography, Box } from '@mui/material';
import React, { FC } from 'react';
import { ProgramType } from 'commons/types/models';
import useWidth from 'commons/utils/UseWidth';

type ProgramInfoPropsType = {
  program: ProgramType;
}

const ProgramInfo: FC<ProgramInfoPropsType> = ({ program }) => {
  const width = useWidth();

  return (
    <Stack
      component={Paper}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        width: '100%',
        height: '100%',
        p: 0,
        display: 'flex',
      }}
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box
        sx={{
          flex: width === 'xs' ? '0 0 auto' : '0 0 40%',
          width: width === 'xs' ? '100%' : undefined,
          aspectRatio: '1 / 1',
          overflow: 'hidden',
        }}
      >
        <img
          src={program.cover_image}
          alt={program.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderTopLeftRadius: width === 'xs' ? 5 : 0,
            borderTopRightRadius: 5,
            borderBottomRightRadius: width === 'xs' ? 0 : 5,
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 2, flex: 1 }}>
        <Typography gutterBottom variant="h1">
          {program.name}
        </Typography>
        <Typography variant="body1">
          {program.description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProgramInfo;