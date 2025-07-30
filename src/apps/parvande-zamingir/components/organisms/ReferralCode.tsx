import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Typography,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFollowMutation, useGetMyMembershipQuery } from "commons/redux/apis/incentive-service/Network";
import { PARVANDE_ZAMINGIR_NETWORK_ID } from "apps/parvande-zamingir/constants/game-info";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import { toast } from "react-toastify";
import { useFSMContext } from "commons/hooks/useFSMContext";

export default function ReferralCode() {
  const { openDialog, closeDialog } = useFSMContext();
  const { data: myMembership } = useGetMyMembershipQuery({ networkId: PARVANDE_ZAMINGIR_NETWORK_ID });
  const [follow, followResult] = useFollowMutation();
  const [otherCode, setOtherCode] = useState("");

  useEffect(() => {
    if (followResult.isSuccess) {
      openDialog(
        <CustomDialogContent
          image={<ScoreAnnouncement />}
          title="تبریک! تو کد معرفت رو زدی و ۵۰۰ امتیاز گرفتی. باریکلا"
          onClick={() => closeDialog()}
        />
      );
    }
    if (followResult.isError && followResult.error?.data?.error) {
      openDialog(
        <CustomDialogContent
          title={followResult.error.data.error}
          onClick={() => closeDialog()}
        />
      );
    }
  }, [followResult.isSuccess, followResult.isError]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(myMembership.code);
      toast.success('کد مخصوصت با موفقیت کپی شد')
    } catch {
      // مرورگر پشتیبانی نکرد
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherCode.trim()) follow({ code: otherCode.trim(), networkId: PARVANDE_ZAMINGIR_NETWORK_ID });
  };

  if (!myMembership) return null;

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        value={myMembership.code}
        inputProps={{ style: { fontSize: "2.5rem", fontWeight: 700, textAlign: 'center' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ fontSize: "1.5rem" }}>کد مخصوصت</Typography>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />

      <TextField
        fullWidth
        placeholder="کد معرف خود را وارد کنید"
        value={otherCode}
        onChange={(e) => setOtherCode(e.target.value)}
        inputProps={{ style: { fontSize: "2rem" } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                type="submit"
                variant="contained"
                disabled={!otherCode.trim()}
                onClick={handleSubmit}
                sx={{ px: 3, fontSize: "1.5rem" }}   // ← سایز متن دکمه
              >
                ثبت
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}