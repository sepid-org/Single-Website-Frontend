import { Paper, Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import React, { FC } from "react";
import { toPersianNumber } from "commons/utils/translateNumber";
import backgroundImage from "../../../../assets/court-card-background-image.jpg";
import useGetCourtFinalSupportPercentage from "apps/ashbaria/hooks/useGetCourtFinalSupportPercentage";
import useGetCourtFinalScore from "apps/ashbaria/hooks/useGetCourtFinalScore";
import { Secondary } from "apps/ashbaria/constants/colors";
import GrayLikeIcon from "apps/ashbaria/components/atoms/icons/GrayLikeIcon";
import GrayVerifyIcon from "apps/ashbaria/components/atoms/icons/GrayVerify";
import { ASHBARIA_SURVEY_CORRESPONDING_FSM_ID, ASHBARIA_SURVEY_SUBMIT_REWARD } from "apps/ashbaria/constants/game-info";

type PropsType = {
  court: CourtType;
}

const FinishedCourtCard: FC<PropsType> = ({
  court,
}) => {
  const finalSupportPercentage = useGetCourtFinalSupportPercentage(court.corresponding_fsm);
  const finalScore = useGetCourtFinalScore(court.corresponding_fsm);

  return (
    <Stack
      width={'100%'}
      height={'100%'}
      component={Paper}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={1}
      padding={1}
      sx={{
        cursor: 'not-allowed',
        border: '0.9px solid black',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        userSelect: 'none'
      }}
    >
      {court.corresponding_fsm !== ASHBARIA_SURVEY_CORRESPONDING_FSM_ID &&
        <Typography
          fontSize={10}
          fontWeight={400}
          color={Secondary}
          textAlign={'center'}
          sx={{ userSelect: 'none' }}
        >
          {'دادگاه'}
        </Typography>
      }
      <Typography
        fontSize={12}
        fontWeight={600}
        color={Secondary}
        textAlign={'center'}
        sx={{ userSelect: 'none' }}
      >
        {court.title}
      </Typography>
      <Stack direction={'row'} spacing={1}>
        {court.corresponding_fsm !== ASHBARIA_SURVEY_CORRESPONDING_FSM_ID &&
          <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
            <Typography
              fontSize={10}
              fontWeight={800}
              color={Secondary}
              sx={{ userSelect: 'none' }}
            >
              {toPersianNumber(finalSupportPercentage)}
            </Typography>
            <GrayLikeIcon size={24} />
          </Stack>
        }
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography
            fontSize={10}
            fontWeight={800}
            color={Secondary}
            sx={{ userSelect: 'none' }}
          >
            {court.corresponding_fsm !== ASHBARIA_SURVEY_CORRESPONDING_FSM_ID ? finalScore : ASHBARIA_SURVEY_SUBMIT_REWARD}
          </Typography>
          <GrayVerifyIcon size={24} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FinishedCourtCard;