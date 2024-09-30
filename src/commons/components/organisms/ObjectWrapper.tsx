import { Box } from "@mui/material";
import { ObjectLogicType, ObjectType } from "commons/types/models";
import React, { FC, ReactNode } from "react";

type ObjectWrapperPropsType = {
  logic: ObjectLogicType;
  object: ObjectType;
  children: ReactNode;
}

const ObjectWrapper: FC<ObjectWrapperPropsType> = ({
  logic,
  object,
  children,
}) => {

  return (
    <Box onClick={logic?.onClick} onMouseEnter={logic?.onMouseEnter} onMouseLeave={logic?.onMouseLeave}>
      {children}
    </Box>
  );
};

export default ObjectWrapper;
