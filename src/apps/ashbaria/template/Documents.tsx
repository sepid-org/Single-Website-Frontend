import { Grid } from "@mui/material";
import React from "react";
import Documents from "../components/organisms/Documents";
import useDocuments from "../hooks/useDocuments";

const DocumentsTemplate = () => {
  const { } = useDocuments();

  return (
    <Documents documents={[]} />
  )
}

export default DocumentsTemplate;