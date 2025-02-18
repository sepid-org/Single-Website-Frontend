import React from "react";
import { IconButton } from "@mui/material";
import ArrowRightIcon from "../../atoms/icons/ArrowRight";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

const BackButton = ({ onClick = null, destination = '/menu/' }) => {
  const localNavigate = useLocalNavigate();
  return (
    <IconButton onClick={onClick || (() => { localNavigate(destination) })}>
      <ArrowRightIcon />
    </IconButton >
  )
}

export default BackButton;