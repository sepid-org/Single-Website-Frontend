import React, { FC } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import LampOnIcon from "../../atoms/icons/LampOn";
import ScoreChip from "../../molecules/chips/Score";
import { useSpendFundsOnObjectMutation } from "commons/redux/apis/cms/currency/Spend";
import { PublicGeneralHint } from "commons/types/models";

type BuyHintDialogPropsType = {
  hint: PublicGeneralHint;
  onClose: any;
}

const BuyHint: FC<BuyHintDialogPropsType> = ({
  hint,
  onClose,
}) => {
  const [spendFundsOnObject, result] = useSpendFundsOnObjectMutation();
  // get hint buy cost

  const handleBuyHint = () => {
    spendFundsOnObject({
      objectId: "1",
      funds: {
        "ashbaria-coin": 3,
      }
    })
  }

  return (
    <Stack padding={3} spacing={2} component={Paper} maxWidth={'xs'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack alignItems={'center'} direction={'row'} spacing={0.5}>
          <LampOnIcon />
          <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
            {hint.title}
          </Typography>
        </Stack>

        <ScoreChip value={34} />
      </Stack>

      <Typography textAlign={'center'} color={'white'}>
        {`با خرید این راهنمایی ${34} سکه از خرج می کنی. آیا از خرید این راهنمایی مطمئنی؟`}
      </Typography>

      <Button variant='contained' fullWidth onClick={handleBuyHint}>
        {'خرید تقلب'}
      </Button>
      <Button variant='outlined' fullWidth onClick={onClose}>
        {'بی‌خیال'}
      </Button>
    </Stack>
  )
}

export default BuyHint;