import React, { Fragment, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FilmType } from 'apps/film-bazi/types';
import { useGetDiscountCodeMutation } from 'apps/film-bazi/redux/slices/DiscountCode';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { Box, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import ShareDiscountCodeButton from '../molecules/buttons/ShareDiscountCode';
import { ContentCopy } from '@mui/icons-material';
import CopyDiscountCodeButton from '../molecules/buttons/CopyDiscountCode';

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
        <Stack direction="row" spacing={2} alignItems="center" justifyContent={'center'} mt={2}>
          <TextField
            value={discountCode.code}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Box ml={-1.5}>
                    <CopyDiscountCodeButton discountCode={discountCode} />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <Box mr={-1.5}>
                  <InputAdornment position="end">
                    <ShareDiscountCodeButton discountCode={discountCode} />
                  </InputAdornment>
                </Box>
              ),
            }}
          />
        </Stack>
      </Fragment >;
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
        {film.gisheh7_link &&
          <Button
            variant="outlined"
            href={film.gisheh7_link}
            target="_blank"
            sx={{
              color: '#ff4759',
              borderColor: '#ff4759',
              '&:hover': {
                backgroundColor: '#ff475910',
                borderColor: '#ff4759',
              },
            }}
          >
            <Typography fontWeight="bold" color={'#ff2335'}>
              {'خرید از گیشه۷'}
            </Typography>
          </Button>
        }
        <Button variant='contained' onClick={onClose} color="primary">
          {'متوجه شدم'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountDialog;