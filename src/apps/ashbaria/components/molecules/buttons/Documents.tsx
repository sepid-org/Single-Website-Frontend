import { IconButton } from "@mui/material";
import React, { Fragment } from "react";
import DocumentIcon from "../../atoms/icons/Documents";
import { useParams } from "react-router-dom";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

const DocumentsButton = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const localNavigate = useLocalNavigate();

  return (
    <Fragment>
      <IconButton disableRipple onClick={() => localNavigate(`/court/${fsmId}/info/?dialog=court-documents`)}>
        <DocumentIcon />
      </IconButton>
    </Fragment>
  )
}

export default DocumentsButton;