import React from "react";
import { Button } from "@mui/material";

const BuyBookButton = () => {

  return (
    <Button
      variant="contained"
      sx={{ width: 160 }}
      href="https://qandilsch.ir/product/10-raz-ashbaria/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {'خرید کتاب'}
    </Button>
  )
}

export default BuyBookButton;
