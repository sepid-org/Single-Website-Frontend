import { Box } from "@mui/material";
import { ObjectType } from "commons/types/models";
import React, { FC, ReactNode } from "react";

type ObjectWrapperPropsType = {
  object: ObjectType & {
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  },
  children: ReactNode;
}

const ObjectWrapper: FC<ObjectWrapperPropsType> = ({
  object: {
    id,
    onClick,
    onMouseEnter,
    onMouseLeave,
  },
  children,
}) => {

  return (
    <Box onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </Box>
  );
};

export default ObjectWrapper;
