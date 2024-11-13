import { Button, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import VerifyIcon from "../../atoms/icons/Verify";
import { Golden } from "apps/ashbaria/constants/colors";

const UncompletedMission = ({ requiredFollows, rewardScore, completable, handleClick, id }) => {

	return (
		<Stack
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={2}
			sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
			padding={1}
		>
			<Typography
				align="center"
				sx={{
					color: Golden,
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
				{'دنبال‌شدن'}
			</Typography>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} marginTop={1}>
				{completable ?
					(
						<Button
							variant="outlined"
							fullWidth
							size="small"
							onClick={() => handleClick({ missionId: id })}
						>
							<Typography noWrap fontSize={16} fontWeight={800}>
								{`دریافت ${rewardScore}`}
							</Typography>
							<VerifyIcon />
						</Button>
					) :
					(
						<Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}>
							<Typography fontSize={16} fontWeight={800}>
								{rewardScore}
							</Typography>
							<VerifyIcon />
						</Stack>
					)
				}
			</Stack>
		</Stack >
	);
}

export default UncompletedMission;