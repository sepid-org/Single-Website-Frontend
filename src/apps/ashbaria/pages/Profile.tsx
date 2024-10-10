import React, { Fragment } from "react";
import { DashboardTabType } from 'commons/types/global';
import UserInfo from "../templates/UserInfo";
import { Box } from "@mui/material";
import Dashboard from "commons/components/organisms/Dashboard";

export default function Profile(){

   return(
        <Fragment>
            <Box
                sx={{
                    minHeight: "100vh",
                    minWidth: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <UserInfo />
            </Box>
        </Fragment>
    );
}