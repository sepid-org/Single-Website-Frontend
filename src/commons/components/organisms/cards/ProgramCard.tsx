import {
  Card,
  Grid,
  Stack,
  Typography,
  ButtonBase,
  Box,
} from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramType } from 'commons/types/models';

type ProgramCardPropsType = {
  program: Partial<ProgramType>;
};

const ProgramCard: FC<ProgramCardPropsType> = ({ program }) => {
  const navigate = useNavigate();

  if (!program) return null;

  return (
    <ButtonBase
      sx={{ width: '100%' }}
      disableRipple
      onClick={() => program.is_active && navigate(`/program/${program.slug}/registration/`)}>
      <Card
        sx={{
          position: 'relative',
          height: { xs: 400, md: 240 },
          width: '100%',
          padding: 0,
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0 0.125rem 0.25rem rgb(0, 0, 0, 0.1)',
          transition: '0.1s ease-in-out',
          filter: program.is_active ? 'none' : 'grayscale(100%)',
          opacity: program.is_active ? 1 : 0.6,
          cursor: program.is_active ? 'pointer' : 'not-allowed',
          '&:hover': program.is_active && {
            transform: 'translateY(-0.1rem) scale(1.02)',
            boxShadow: '0 0.5em 2rem -1rem rgba(0, 0, 0, 0.5)',
          },
        }}>
        <Grid
          container
          sx={{
            height: '100%',
            justifyContent: { xs: 'center', md: 'space-between' },
          }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ height: { xs: 240, md: 240 } }}
            position="relative"
          >
            <Box
              component="img"
              alt={program.name}
              src={program.cover_image}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ p: 2, height: { xs: 160, md: 240 } }}
          >
            <Stack spacing={1}>
              <Typography
                textAlign={'left'}
                variant="h4"
                component="h2"
                gutterBottom
                color={(theme) => theme.palette.primary.dark}
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                {program.name}
              </Typography>

              <Typography
                textAlign={'left'}
                variant="body2"
                color="textSecondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 3, md: 4, lg: 5 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {program.description}
              </Typography>

            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ButtonBase>
  );
};

export default ProgramCard;