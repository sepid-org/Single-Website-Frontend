import { Box } from "@mui/material";
import { ObjectLogicType, ObjectType } from "commons/types/models";
import React, { FC, ReactNode } from "react";

type ObjectWrapperPropsType = {
  logic: ObjectLogicType;
  children: ReactNode;
}

const ObjectWrapper: FC<ObjectWrapperPropsType> = ({
  logic,
  children,
}) => {

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        ...logic?.sx
      }}
      onClick={logic?.onClick}
      onMouseEnter={logic?.onMouseEnter}
      onMouseLeave={logic?.onMouseLeave}
    >
      {children}
    </Box>
  );
};

export default ObjectWrapper;
