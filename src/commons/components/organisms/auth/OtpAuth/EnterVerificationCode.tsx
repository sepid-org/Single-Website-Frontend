import React, { FC, useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { useSearchParams } from "react-router-dom";
import { useGetVerificationCodeMutation, useOtpLoginMutation } from "commons/redux/apis/party/UserApi";
import { LoginTabs } from ".";

const TIMER_KEY = "verification_timer_end";

const EnterVerificationCode: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [verificationCode, setVerificationCode] = useState(Array(5).fill(""));
  const [countdown, setCountdown] = useState(() => {
    const endTime = localStorage.getItem(TIMER_KEY);
    if (endTime) {
      const remaining = Math.round((parseInt(endTime) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return 90;
  });

  const [otpLogin] = useOtpLoginMutation();
  const phoneNumber = searchParams.get("phoneNumber");
  const [getVerificationCode, getVerificationCodeResult] = useGetVerificationCodeMutation();

  const handleKeyDownVerificationCode =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Backspace") return;

      if (verificationCode[index]) return;

      if (index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`) as HTMLInputElement | null;
        if (prevInput) prevInput.focus();

        const newCode = [...verificationCode];
        newCode[index - 1] = "";
        setVerificationCode(newCode);
      }
    };

  useEffect(() => {
    if (getVerificationCodeResult.isSuccess) {
      setVerificationCode(Array(5).fill(""));

      toast.success("کد تأیید با موفقیت برای شما ارسال شد");
      const endTime = Date.now() + 90 * 1000;
      localStorage.setItem(TIMER_KEY, endTime.toString());
      setCountdown(90);
    }
  }, [getVerificationCodeResult.isSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev - 1;
          if (newValue === 0) {
            localStorage.removeItem(TIMER_KEY);
          }
          return newValue;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleGetVerificationCode = () => {
    getVerificationCode({ phoneNumber, verificationType: "create-user-account" });
  };

  const handleChangeVerificationCode =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = toEnglishNumber(event.target.value);
      if (value.length <= 1 && /^[0-9]*$/.test(value)) {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 4) {
          // Move to the next input field
          const nextInput = document.getElementById(`code-input-${index + 1}`);
          if (nextInput) nextInput.focus();
        } else if (newCode.every((digit) => digit)) {
          // Call handleLogin if all digits are entered
          handleLogin(newCode);
        }
      }
    };

  const handleGoToPreviousPage = () => {
    setSearchParams({ tab: LoginTabs.EnterPhoneNumber });
  };

  const handleLogin = (verificationCode: string[]) => {
    otpLogin({ phoneNumber, verificationCode: verificationCode.join("") });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Stack spacing={1} width="100%">
      <Typography textAlign="center" gutterBottom>
        {`کد تأیید پنج‌رقمی به شماره ${toPersianNumber(
          phoneNumber
        )} ارسال شد. لطفاً آن را در کادر زیر وارد نمایید:`}
      </Typography>

      <Stack direction="row-reverse" spacing={1} justifyContent="center">
        {verificationCode.map((digit, index) => (
          <TextField
            key={index}
            id={`code-input-${index}`}
            value={digit}
            onChange={handleChangeVerificationCode(index)}
            onKeyDown={handleKeyDownVerificationCode(index)}
            variant="outlined"
            inputProps={{
              dir: "ltr",
              maxLength: 1,
              style: { padding: 0, textAlign: "center", height: 40, width: 40 },
              inputMode: "numeric",
              type: "tel",
            }}
          />
        ))}
      </Stack>

      <Button
        fullWidth
        variant={countdown > 0 ? "outlined" : "contained"}
        onClick={handleGetVerificationCode}
        disabled={countdown > 0}
      >
        {countdown > 0
          ? `ارسال مجدد کد در ${toPersianNumber(formatTime(countdown))}`
          : "کد را دریافت نکرده‌اید؟ ارسال مجدد"}
      </Button>

      <Button
        disabled={getVerificationCodeResult.isLoading}
        fullWidth
        onClick={handleGoToPreviousPage}
      >
        {"شماره تماس را نادرست وارد کرده‌ام"}
      </Button>
    </Stack>
  );
};

export default EnterVerificationCode;