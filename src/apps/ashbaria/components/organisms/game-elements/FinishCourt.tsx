import { useFinishCourtMutation, useGetCourtsQuery, useGetUserLastResultInFSMQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, Fragment, useEffect } from "react";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Gold } from "apps/ashbaria/constants/colors";
import MyLastSupportInFSM from "../../molecules/chips/MyLastSupportInFSM";
import { useParams } from "react-router-dom";
import useFinishFSM from "commons/hooks/useFinishFSM";
import MyLastScoreInFSM from "../../molecules/chips/MyLastScoreInFSM";
import CustomContainedButton from "../../molecules/buttons/CustomContainedButton";

type FinishCourtPropsType = {}

const FinishCourt: FC<FinishCourtPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const [finishFSM, finishFSMResult] = useFinishFSM();
  const { data: userLastResultInFSM } = useGetUserLastResultInFSMQuery({ correspondingFsmId: fsmId })
  const { data: courts } = useGetCourtsQuery();

  const currentCourt = courts?.find(court => court.corresponding_fsm === parseInt(fsmId))

  const handleFinishCourt = () => {
    finishCourt({ fsmId });
  }

  useEffect(() => {
    if (finishCourtResult.isSuccess) {
      finishFSM();
    }
  }, [finishCourtResult])

  return (
    <Stack
      height={'100%'}
      width={'100%'}
      component={Paper}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      spacing={2}
    >

      <Typography color={Gold} variant="h4">
        {'اتمام پرونده'}
      </Typography>

      <Typography variant="h4" textAlign={'center'}>
        {userLastResultInFSM?.support_percentage < 0 ?
          'دلایل کافی نیست و چلویی تبرئه می‌شود' :
          currentCourt?.judge_verdict
        }
      </Typography>

      {userLastResultInFSM?.support_percentage > 5 &&
        <Fragment>
          <Typography color={Gold} variant="h4">
            {'نتیجه'}
          </Typography>

          <Stack direction={'row'} spacing={2}>
            <MyLastSupportInFSM />
            <MyLastScoreInFSM />
          </Stack>
        </Fragment>
      }

      <CustomContainedButton handleClick={handleFinishCourt} label="پایان دادگاه" />
    </Stack>
  )
}

export default FinishCourt;