import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";

type CustomStylesWrapperPropsType = {
  children: ReactNode;
}

const CustomStylesWrapper: FC<CustomStylesWrapperPropsType> = ({
  children,
}) => {

  return (
    <Box sx={{}}>
      {children}
    </Box>
  );
};

export default CustomStylesWrapper;
