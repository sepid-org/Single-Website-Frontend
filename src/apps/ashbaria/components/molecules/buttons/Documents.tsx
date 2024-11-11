import { IconButton } from "@mui/material";
import React, { Fragment } from "react";
import DocumentsIcon from "../../atoms/icons/Documents";
import { useParams } from "react-router-dom";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

const DocumentsButton = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const localNavigate = useLocalNavigate();

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => localNavigate(`/court/${fsmId}/info/?dialog=court-documents&fsmId=${fsmId}`)}>
        <DocumentsIcon />
      </IconButton>
    </Fragment>
  )
}

export default DocumentsButton;