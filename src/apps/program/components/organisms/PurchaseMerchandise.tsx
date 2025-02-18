import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApplyDiscountCodeMutation, usePurchaseMutation } from "apps/website-display/redux/features/sales/Purchase";
import { MerchandiseType } from "commons/types/models";
import { toPersianNumber } from "commons/utils/translateNumber";
import { useParams } from "react-router-dom";

type PurchaseMerchandisePropsType = {
  merchandise: MerchandiseType;
};

const PurchaseMerchandise: FC<PurchaseMerchandisePropsType> = ({
  merchandise,
}) => {
  const { programSlug } = useParams();
  const [discountCode, setDiscountCode] = useState(null);
  const [price, setPrice] = useState(merchandise.price);
  const [applyDiscountCode, applyDiscountCodeResult] = useApplyDiscountCodeMutation();
  const [purchase, purchaseResult] = usePurchaseMutation();

  useEffect(() => {
    if (purchaseResult.isSuccess) {
      if (purchaseResult.data.is_payment_required) {
        window.location.href = purchaseResult.data.payment_link;
      } else {
        window.location.href = `/program/${programSlug}/purchase/?status=success`;
      }
    }
  }, [purchaseResult])

  useEffect(() => {
    if (applyDiscountCodeResult.isSuccess) {
      toast.success('کد تخفیف با موفقیت اعمال شد.');
      setPrice(applyDiscountCodeResult.data.new_price);
    }
  }, [applyDiscountCodeResult])

  const handlePurchase = () => {
    purchase({ merchandiseId: merchandise.id, discountCode });
  };

  const submitDiscount = () => {
    if (!discountCode) {
      toast.error('کد تخفیف را وارد کنید.');
      return;
    }
    applyDiscountCode({
      merchandiseId: merchandise.id,
      discountCode,
    });
  };

  return (
    <Stack component={Paper}>
      <Grid padding={2} container spacing={2} alignItems={'center'}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3">
            {merchandise.name}
          </Typography>
        </Grid>
        <Grid
          xs={12} sm={8}
          container
          item
          justifyContent="center"
          alignItems='end'
          spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                variant="outlined"
                label="کد تخفیف"
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitDiscount}>
                {'اعمال'}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <Typography align="center" gutterBottom>
                {'مبلغ قابل پرداخت:'}
              </Typography>
              <Typography
                align="center"
                sx={{
                  fontSize: 25,
                  fontWeight: 400,
                }}>
                {price === 0 ? 'رایگان!' : `${toPersianNumber(price)} تومان`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlePurchase}>
                {'پرداخت'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PurchaseMerchandise;