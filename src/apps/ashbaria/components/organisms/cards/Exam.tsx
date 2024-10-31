import { Box, Paper, Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import { toPersianNumber } from "commons/utils/translateNumber";
import VerifyIcon from "../../atoms/icons/Verify";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

type ExamCardPropsType = {}

const ExamCard: FC<ExamCardPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();

  const onClick = () => {
    localNavigate(`/start-exam/`)
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
        <Typography fontSize={14} fontWeight={600} color={Golden} textAlign={'center'}>
          {'آزمونک'}
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography fontSize={10} fontWeight={800}>
            {'دو فرصت باقی‌مانده'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ExamCard;