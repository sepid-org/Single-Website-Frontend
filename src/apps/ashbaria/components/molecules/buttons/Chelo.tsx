import { IconButton } from "@mui/material";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import CheloIcon from "../../atoms/icons/Chelo";

const CheloButton = () => {
  const fsmId = parseInt(useParams().fsmId);
  const localNavigate = useLocalNavigate();

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => localNavigate(`/court/${fsmId}/info/?dialog=court-chelos`)}>
        <CheloIcon />
      </IconButton>
    </Fragment>
  )
}

export default CheloButton;