import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateDiscountCodeMutation } from "apps/website-display/redux/features/sales/DiscountCode";
import { useGetMerchandisesQuery } from "apps/website-display/redux/features/sales/Merchandise";
import { toEnglishNumber } from "commons/utils/translateNumber";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useGetProgramQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { CreateDiscountCodeDto } from "commons/types/models";

type CreateDiscountCodeDialogType = {
  open: boolean;
  handleClose: any;
}

const CreateDiscountCodeDialog: FC<CreateDiscountCodeDialogType> = ({
  open,
  handleClose,
}) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [discountCode, setDiscountCode] = useState<CreateDiscountCodeDto>(null);
  const [createDiscountCode, result] = useCreateDiscountCodeMutation();
  const { data } = useGetMerchandisesQuery({ programSlug }, { skip: !Boolean(program) });
  const allMerchandises = data?.results || [];

  const handleCreateDiscountCode = () => {
    createDiscountCode({
      ...discountCode,
      value: discountCode.value / 100,
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setDiscountCode(null);
      handleClose();
    }
  }, [result])

  return (
    <Dialog disableScrollLock maxWidth="xs" open={open}>
      <DialogTitle>{'افزودن کد تخفیف'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1.5} paddingTop={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='نام کاربری'
              InputProps={{
                sx: { padding: 0 },
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={'چنانچه می‌خواهید کد تخفیف مختص کاربر خاصی باشد، نام کاربری او را وارد کنید. در غیر این صورت، کد تخفیف به‌صورت عام خواهد بود.'}>
                      <ErrorOutlineIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={discountCode?.username || ''}
              onChange={(e) =>
                setDiscountCode({
                  ...discountCode,
                  username: (e.target.value as any),
                })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant='outlined'
              label='درصد تخفیف'
              value={discountCode?.value || ''}
              onChange={(event) =>
                setDiscountCode({
                  ...discountCode,
                  value: parseInt(toEnglishNumber(event.target.value))
                })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="دفعات استفاده"
              variant="outlined"
              type="number"
              inputMode="numeric"
              inputProps={{ min: 1, step: 1 }}
              value={discountCode?.remaining ?? ''}
              onChange={(event) => {
                const rawValue = event.target.value;
                const parsed = parseInt(rawValue, 10);

                const value = isNaN(parsed) || parsed < 1 ? 1 : parsed;

                setDiscountCode((prev) => ({
                  ...prev,
                  remaining: rawValue === '' ? null : value,
                }));
              }}
              InputProps={{
                sx: { padding: 0 },
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={'اگر خالی بماند، کد به‌صورت نامحدود قابل استفاده خواهد بود'}>
                      <ErrorOutlineIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='سقف تخفیف (تومان)'
              value={discountCode?.max_discount_amount || ''}
              onChange={(event) =>
                setDiscountCode({ ...discountCode, max_discount_amount: parseInt(event.target.value) })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              getOptionLabel={(option) => option.name}
              onChange={(event, newMerchandises) => {
                setDiscountCode({
                  ...discountCode,
                  merchandise_ids: newMerchandises.map(merchandise => merchandise.id),
                });
              }}
              value={allMerchandises.filter(merchandise => discountCode?.merchandise_ids?.includes(merchandise.id)) || []}
              renderInput={(params) =>
                <TextField
                  required
                  {...params}
                  label="بلیط‌ها"
                />
              }
              options={allMerchandises}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>{'انصراف'}</Button>
        <Button
          variant='contained'
          color='primary'
          disabled={!discountCode}
          onClick={handleCreateDiscountCode}>
          {'افزودن'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default CreateDiscountCodeDialog;