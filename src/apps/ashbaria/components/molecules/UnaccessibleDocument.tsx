import React, { Fragment } from "react";
import { Box, Grid, Typography } from "@mui/material";
import lockIcon from "../../assets/lock.svg";


const UnaccessibleDocument = () => {
	return (
		<Fragment>
			<Grid
				item
				xs={2}
				sx={{
					display: "flex",
					justifyContent: "center",
					height: "148px",
					minWidth: "80px",
				}}
			>
				<Box
					sx={{
						width: "100%",
						minHeight: "100%",
						maxWidth: "124px",
						padding: "12px 4px 12px 4px",
						gap: "4px",
						borderRadius: "12px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						boxShadow: "0px 2px 6px 0px #0000001A",
						backgroundColor: "#00000066"
					}}
				>
					<Box
						component="img"
						src={lockIcon}
						width="69px"
						height="69px"
					/>
					<Typography
						sx={{
							color: "#60557E",
							fontSize: "16px",
							fontWeight: 400,
							lineHeight: "23.86px",
							textAlign: "center",
						}}
					>
						مکالمات چپق‌فروشان
					</Typography>
				</Box>
			</Grid>
		</Fragment>
	)
}

export default UnaccessibleDocument;
