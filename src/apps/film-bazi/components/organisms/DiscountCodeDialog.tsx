import React, { Fragment, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FilmType } from 'apps/film-bazi/types';
import { useGetDiscountCodeMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { Link } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Golden } from 'apps/film-bazi/constants/colors';

type DiscountDialogProps = {
  open: boolean;
  onClose: () => void;
  film: FilmType;
};

const DiscountDialog: React.FC<DiscountDialogProps> = ({
  open,
  onClose,
  film,
}) => {
  const [getDiscountCode, { data: discountCode, error }] = useGetDiscountCodeMutation();

  useEffect(() => {
    if (open) {
      getDiscountCode({ filmId: film.id });
    }
  }, [open])

  const copyToClipboard = () => {
    toast.success('کد تخفیف با موفقیت کپی شد');
    navigator.clipboard.writeText(discountCode?.code);
  };

  let dialogContent =
    <DialogContentText>
      {'در حال بارگذاری...'}
    </DialogContentText>;

  if (discountCode) {
    dialogContent =
      <Fragment>
        <DialogContentText textAlign={'justify'}>
          {`این کد تخفیف ${toPersianNumber(discountCode?.percentage)} درصدی، مخصوص خودت برای فیلم سینمایی ${film.name} هست. اون رو به دوستات بده تا باهاش خرید کنن و امتیاز و سرمایه بیش‌تری به دست بیاری:`}
        </DialogContentText>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} mt={2}>
          <Typography variant="h3" textAlign={'center'} color={'#EC6823'}>
            {discountCode?.code}
          </Typography>
          <IconButton onClick={copyToClipboard} color="inherit">
            <ContentCopyIcon />
          </IconButton>
        </Stack>
      </Fragment>;
  }

  if (error) {
    dialogContent =
      <DialogContentText>
        {(error as FetchBaseQueryError)?.data?.['error']}
      </DialogContentText>;
  }

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>{`کد تخفیف فیلم ${film.name}`}</DialogTitle>
      <DialogContent>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color="primary">
          {'متوجه شدم'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountDialog;