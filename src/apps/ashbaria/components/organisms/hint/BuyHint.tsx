import React, { FC, useEffect } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import LampOnIcon from "../../atoms/icons/LampOn";
import ScoreChip from "../../molecules/chips/Score";
import { useSpendFundsOnObjectMutation } from "commons/redux/apis/cms/treasury/Spend";
import { PublicResourceType } from "commons/types/models";
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import dialogService from "commons/components/organisms/PortalDialog";

type BuyHintDialogPropsType = {
  hint: PublicResourceType;
  onClose: any;
}

const BuyHint: FC<BuyHintDialogPropsType> = ({
  hint,
  onClose,
}) => {
  const [spendFundsOnObject, result] = useSpendFundsOnObjectMutation();

  // todo: attributes should be calculated in the backend?
  const buyAttribute = hint?.attributes?.find(attribute => attribute.type === 'Buy')
  const costAttribute = buyAttribute?.attributes?.find(attribute => attribute.type === 'Cost')
  const ashbariaCost = costAttribute?.['value']?.[ASHBARIA_COIN];

  const handleBuyHint = () => {
    spendFundsOnObject({
      objectId: hint.object_id,
      funds: {
        "ashbaria-coin": ashbariaCost,
      }
    })
  }

  useEffect(() => {
    if (result.isError) {
      if ((result.error['data'].error as string).startsWith('Insufficient')) {
        dialogService.open({
          component:
            <CustomDialogContent
              title={"متاسفم! سکه‌ی کافی نداری"}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
  }, [result])

  // todo: should get the coin name from bank
  return (
    <Stack padding={3} spacing={2} component={Paper} maxWidth={'xs'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack alignItems={'center'} direction={'row'} spacing={0.5}>
          <LampOnIcon />
          <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
            {hint.title}
          </Typography>
        </Stack>

        <ScoreChip value={-ashbariaCost} />
      </Stack>

      <Typography textAlign={'center'} color={'white'}>
        {`با خرید این راهنمایی ${ashbariaCost} سکه از خرج می کنی. آیا از خرید این راهنمایی مطمئنی؟`}
      </Typography>

      <Button disabled={result.isLoading} variant='contained' fullWidth onClick={handleBuyHint}>
        {'خرید تقلب'}
      </Button>
      <Button variant='outlined' fullWidth onClick={onClose}>
        {'بی‌خیال'}
      </Button>
    </Stack>
  )
}

export default BuyHint;