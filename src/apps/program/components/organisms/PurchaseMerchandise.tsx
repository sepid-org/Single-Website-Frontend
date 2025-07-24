import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApplyDiscountCodeMutation, usePurchaseMutation } from "apps/website-display/redux/features/sales/Purchase";
import { MerchandiseType } from "commons/types/models";
import { useParams } from "react-router-dom";
import { formatPrice } from "commons/utils/formatPrice";

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
    <Grid container spacing={1} alignItems={'end'}>
      <Grid item xs={12} sm={4} md={5} alignSelf={'center'}>
        <Stack spacing={1}>
          <Typography variant="h3">
            {merchandise.title}
          </Typography>
          <Typography color="text.secondary">
            {merchandise.description}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4} md={3}>
        <Stack spacing={1}>
          <TextField
            fullWidth
            variant='standard'
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
      <Grid item xs={12} sm={4} md={4}>
        <Stack alignItems="center">
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            {'مبلغ قابل پرداخت:'}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            {hasInitialDiscount && (
              <Typography noWrap sx={{ fontSize: 14, textDecoration: 'line-through', color: 'text.disabled' }}>
                {formatPrice(originalPrice)} تومان
              </Typography>
            )}
            <Typography noWrap sx={{ fontSize: 24, fontWeight: 500 }}>
              {price === 0 ? 'رایگان!' : `${formatPrice(price)} تومان`}
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
  );
};

export default PurchaseMerchandise;