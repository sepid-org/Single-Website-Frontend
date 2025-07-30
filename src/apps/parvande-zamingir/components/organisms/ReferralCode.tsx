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
import dialogService from "commons/components/organisms/PortalDialog";

export default function ReferralCode() {
  const { data: myMembership } = useGetMyMembershipQuery({ networkId: PARVANDE_ZAMINGIR_NETWORK_ID })
  const [follow, followResult] = useFollowMutation();
  const [otherCode, setOtherCode] = useState("");

  useEffect(() => {
    if (followResult.isSuccess) {
      dialogService.open({
        component:
          <CustomDialogContent
            image={<ScoreAnnouncement />}
            title={`تبریک! تو کد دوستت رو زدی و امتیازشو گرفتی. باریکلا`}
            onClick={() => {
              dialogService.close();
            }}
          />
      })
    }
    if (followResult.isError) {
      if (followResult.error?.['data']?.error) {
        dialogService.open({
          component:
            <CustomDialogContent
              title={followResult.error['data'].error}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
  }, [followResult.isSuccess, followResult.isError])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(myMembership.code);
    } catch {
      // مرورگر پشتیبانی نکرد
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherCode.trim()) follow({ code: otherCode.trim() });
  };

  if (!myMembership) return;

  return (
    <Stack spacing={1}>
      <TextField
        size="small"
        fullWidth
        margin="dense"
        value={myMembership.code}
        InputProps={{
          // توضیح کنار فیلد
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="subtitle2" sx={{ mx: 0.5 }}>
                کد مخصوصت
              </Typography>
            </InputAdornment>
          ),

          // دکمهٔ کپی
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy} edge="end">
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />

      <TextField
        fullWidth
        size="small"
        margin="dense"
        placeholder="کد معرف خود را وارد کنید"
        value={otherCode}
        onChange={(e) => setOtherCode(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                type="submit"
                variant="contained"
                disabled={!otherCode.trim()}
                onClick={handleSubmit}
                sx={{ px: 3 }}
              >
                ثبت
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Stack >
  );
}