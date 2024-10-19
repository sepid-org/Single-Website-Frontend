import React, { FC, Fragment } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import CustomPaper from "../../atoms/CustomPaper";
import LampOnIcon from "../../atoms/icons/LampOn";
import ScoreBadge from "../../molecules/badges/Score";

type BuyHintDialogPropsType = {
  hintId: string;
  open: boolean;
  onClose: any;
}

const BuyHintDialog: FC<BuyHintDialogPropsType> = ({
  hintId,
  open,
  onClose,
}) => {
  // const { data = hint } = useGetHint({ hintId });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'xs'}
      fullWidth
    >
      <Stack padding={3} spacing={2}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack alignItems={'center'} direction={'row'} spacing={0.5}>
            <LampOnIcon />
            <Typography variant="h5" textAlign={'center'} width={'100%'} noWrap>
              {"تقلب اون ور آبی"}
            </Typography>
          </Stack>

          <ScoreBadge value={34} />
        </Stack>

        <Typography textAlign={'center'} color={'white'}>
          {`با خرید این راهنمایی ${34} سکه از خرج می کنی. آیا از خرید این راهنمایی مطمئنی؟`}
        </Typography>

        <Button variant='contained' fullWidth>
          {'خرید تقلب'}
        </Button>
        <Button variant='outlined' fullWidth>
          {'بی‌خیال'}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default BuyHintDialog;