import React from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import { MerchandiseType } from "commons/types/models";
import { formatPrice } from "commons/utils/formatPrice";


const MerchandiseCard: React.FC<{ item: MerchandiseType }> = ({ item }) => {
  const hasDiscount = item.discounted_price && item.discounted_price < item.price;

  return (
    <Stack>
      <Typography variant="subtitle2" fontWeight={600}>
        {item.title}
      </Typography>

      <Stack direction="row" spacing={1}>
        {hasDiscount ? (
          <>
            <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
              {formatPrice(item.price)} تومان
            </Typography>
            <Typography variant="body2" color="primary">
              {item.discounted_price!.toLocaleString()} تومان
            </Typography>
          </>
        ) : (
          <Typography variant="body2">
            {formatPrice(item.price)} تومان
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default MerchandiseCard;