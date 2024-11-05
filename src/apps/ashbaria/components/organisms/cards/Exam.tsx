import { Box, Paper, Stack, Typography } from "@mui/material";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

type ExamCardPropsType = {
  disabled?: boolean;
}

const ExamCard: FC<ExamCardPropsType> = ({
  disabled = true,
}) => {
  const localNavigate = useLocalNavigate();

  const onClick = () => {
    if (!disabled) {
      localNavigate(`/start-exam/`);
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s ease',
        opacity: disabled ? 0.6 : 1,
        '&:hover': {
          transform: disabled ? 'none' : 'scale(1.02)',
        },
      }}
      onClick={onClick}
    >
      <Stack
        width={'100%'}
        height={'100%'}
        component={Paper}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        padding={1}
        sx={{
          borderRadius: 12,
          backgroundColor: disabled ? 'rgba(0, 0, 0, 0.04)' : 'inherit'
        }}
      >
        <Typography
          fontSize={14}
          fontWeight={600}
          color={Golden}
          textAlign={'center'}
        >
          {'آزمونک'}
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography
            fontSize={10}
            fontWeight={800}
            color={disabled ? 'text.disabled' : 'inherit'}
          >
            {'سه فرصت باقی‌مانده'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ExamCard;