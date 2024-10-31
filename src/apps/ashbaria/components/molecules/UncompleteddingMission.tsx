import { Box, Button, Typography } from "@mui/material";
import React, { Fragment } from "react";
import VerifyIcon from "../atoms/icons/Verify";


const UncompletedCodingMission = ({ requiredFollows, rewardScore, completable, handleClick, id}) => {

	return (
		<Box
			sx={{
				bgcolor: 'rgba(0, 0, 0, 0.4)',
				heigh: "110px",
				minWidth: "80px",
				borderRadius: "12px",
				marginLeft: "10px",
				marginRight: "10px",
				flexShrink: 0
			}}
		>
			<Typography
				align="center"
				sx={{
					color: "rgba(255, 168, 0, 1)",
					fontSize: "22px",
					fontWeight: 800,
					lineHeight: "36.27px",
					textAlign: "center",
				}}
			>
				{requiredFollows}
			</Typography>
			<Typography
				align="center"
				sx={{
					fontSize: "16px",
					fontWeight: 400,
					lineHeight: "23.86px",
					textAlign: "center"
				}}
			>
				{"ثبت موفق"}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginLeft: "8px",
					marginRight: "5px",
					marginTop: "5px",
					marginBottom: "5px",
				}}
			>
				{completable ?
					(
						<Button variant="outlined" fullWidth size="small" onClick={() => handleClick({missionId: id})}>
							<Typography
								fontSize={16}
								fontWeight={800}
								sx={{
									textAlign: "right"
								}}
							>
								{"دریافت" + rewardScore}
							</Typography>
							<VerifyIcon />
						</Button>
					) :
					(
						<Fragment>
							<Typography
								fontSize={16}
								fontWeight={800}
								sx={{
									textAlign: "right"
								}}
							>
								{rewardScore}
							</Typography>
							<VerifyIcon />
						</Fragment>
					)
				}
			</Box>
		</Box>
	);
}

export default UncompletedCodingMission;