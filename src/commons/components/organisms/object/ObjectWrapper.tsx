import { Box } from "@mui/material";
import { ComplementaryObjectType } from "commons/types/object/object";
import React, { FC, ReactNode } from "react";

type ObjectWrapperPropsType = {
  complementaryObject: ComplementaryObjectType;
  children: ReactNode;
}

const ObjectWrapper: FC<ObjectWrapperPropsType> = ({
  complementaryObject,
  children,
}) => {
  const logics = complementaryObject?.logics;

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        ...complementaryObject?.sx
      }}
      onClick={logics?.onClick}
      onMouseEnter={logics?.onMouseEnter}
      onMouseLeave={logics?.onMouseLeave}
    >
      {children}
    </Box>
  );
};

export default ObjectWrapper;
