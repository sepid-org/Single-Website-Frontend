import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function SingleWinnerCardSkeleton() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "5px"
            }}
        >
            <Skeleton variant="circular" width="60px" height="60px" sx={{ marginBottom: "5px" }} />
            <Skeleton variant="text" width="20px" height="10px" sx={{ marginBottom: "5px" }} />
            <Skeleton
                variant="rounded"
                sx={{
                    width: {
                        md: "135.67px",
                        xs: "100px"
                    },
                    height: {
                        md: "220px",
                        xs: "180px"
                    },
                    marginBottom: "5px",
                }}
            />
        </Box>
    );
}