import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DiscountCodeChip from "../molecules/DiscountCodeChip";
import MerchandiseCard from "./MerchandiseCard";
import { PurchaseType } from "commons/types/models";
import moment from 'moment-jalaali';
import { formatPrice } from "commons/utils/formatPrice";

moment.loadPersian({ usePersianDigits: true });

const statusTitle = {
  Started: 'ناتمام',
  Success: 'موفق',
  Repetitious: 'تکراری',
  Failed: 'شکست‌خورده'
}

const statusColor: Record<PurchaseType["status"], "success" | "warning" | "error" | "default"> =
{
  Success: "success",
  Started: "warning",
  Failed: "error",
  Repetitious: "default",
};

export const PurchaseHistory: React.FC<{ purchases: PurchaseType[] }> = ({
  purchases,
}) => {
  return (
    <Stack>
      <Grid container spacing={2}>
        {purchases.map((p) => (
          <Grid item xs={12} key={p.created_at + p.amount}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption">
                      {moment(p.created_at).format("yyyy/MM/d - HH:mm")}
                    </Typography>
                    <Chip
                      label={statusTitle[p.status]}
                      size="small"
                      color={statusColor[p.status]}
                    />
                  </Stack>

                  <MerchandiseCard item={p.merchandise} />

                  <Typography variant="body2">
                    مبلغ نهایی پرداختی:{" "}
                    <strong>{formatPrice(p.amount)} تومان</strong>
                  </Typography>

                  {p.discount_code && (
                    <DiscountCodeChip code={p.discount_code} />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
