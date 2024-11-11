import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";

const WinnerRecord = ({ profileImg, score, name }) => {
	return (
		<Fragment>
			<Box
				component="img"
				src={profileImg}
				width={48}
				height={48}
			/>
			<Typography fontWeight={600} fontSize={"11.98px"}
				sx={{
					width: "90px",
					flexShrink: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
				style={{
					direction: "rtl",
					textAlign: "center"
				}}>
				{name}
			</Typography>
			<Typography fontWeight={600} fontSize={"11.98px"}>
				{score}
			</Typography>
		</Fragment>
	);
}

export default WinnerRecord;