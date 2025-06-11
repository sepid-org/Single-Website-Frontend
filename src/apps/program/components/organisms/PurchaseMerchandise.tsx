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

const PurchaseMerchandise: FC<PurchaseMerchandisePropsType> = ({ merchandise }) => {
  const { programSlug } = useParams();
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [applyDiscountCode, applyDiscountCodeResult] = useApplyDiscountCodeMutation();
  const [purchase, purchaseResult] = usePurchaseMutation();

  // Determine displayed price: discounted if available, otherwise default
  const hasInitialDiscount = merchandise.discounted_price != null;
  const originalPrice = merchandise.price;
  const discountedPrice = merchandise.discounted_price ?? merchandise.price;
  const [price, setPrice] = useState<number>(discountedPrice);

  useEffect(() => {
    if (purchaseResult.isSuccess) {
      if (purchaseResult.data.is_payment_required) {
        window.location.href = purchaseResult.data.payment_link;
      } else {
        window.location.href = `/program/${programSlug}/purchase/?status=success`;
      }
    }
  }, [purchaseResult.isSuccess, purchaseResult.data, programSlug]);

  useEffect(() => {
    if (applyDiscountCodeResult.isSuccess) {
      toast.success('کد تخفیف با موفقیت اعمال شد.');
      const newPrice = applyDiscountCodeResult.data.new_price;
      setPrice(newPrice);
    }
  }, [applyDiscountCodeResult.isSuccess, applyDiscountCodeResult.data]);

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
        <Grid item xs={12} sm={3}>
          <Typography variant="h3">
            {merchandise.name}
          </Typography>
        </Grid>
        <Grid
          xs={12} sm={9}
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
            <Stack alignItems="center">
              <Typography gutterBottom sx={{ fontSize: 14 }}>
                {'مبلغ قابل پرداخت:'}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                {hasInitialDiscount && (
                  <Typography noWrap sx={{ fontSize: 14, textDecoration: 'line-through', color: 'text.disabled' }}>
                    {toPersianNumber(originalPrice)} تومان
                  </Typography>
                )}
                <Typography noWrap sx={{ fontSize: 24, fontWeight: 400 }}>
                  {price === 0 ? 'رایگان!' : `${toPersianNumber(price)} تومان`}
                </Typography>
              </Stack>
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
  );
};

export default PurchaseMerchandise;