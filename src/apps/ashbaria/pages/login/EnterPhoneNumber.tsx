import { Button, Paper } from "@mui/material";
import React, { FC } from "react";

type EnterPhoneNumberPropsType = {}

const EnterPhoneNumber: FC<EnterPhoneNumberPropsType> = () => {

  // چه‌جوری یه پیپر توش بندازم؟ پیپری که آبجکت کاستوم/پلیس‌هولkدر هم می‌گیره

  return (
    <Paper
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Button>
        {'ورود'}
      </Button>
    </Paper>
  );
};

export default EnterPhoneNumber;
