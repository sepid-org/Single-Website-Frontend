import { IconButton } from "@mui/material";
import React, { Fragment } from "react";
import HintsIcon from "../../atoms/icons/Hints";
import { useParams } from "react-router-dom";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

const HintsButton = () => {
  const fsmId = parseInt(useParams().fsmId);
  const localNavigate = useLocalNavigate();

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => localNavigate(`/court/${fsmId}/info/?dialog=hints`)}>
        <HintsIcon />
      </IconButton>
    </Fragment>
  )
}

export default HintsButton;