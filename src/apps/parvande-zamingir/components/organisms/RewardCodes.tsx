import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { useSubmitRewardCodeMutation } from "commons/redux/apis/incentive-service/RewardCode";
import { PARVANDE_ZAMINGIR_COIN, PARVANDE_ZAMINGIR_GIFT_CODE_NAME } from "apps/parvande-zamingir/constants/game-info";

const RewardCodes = ({ }) => {
	const [rewardCode, setRewardCode] = useState<string>('');
	const [submitRewardCode, result] = useSubmitRewardCodeMutation();

	const handleSubmitRewardCode = () => {
		submitRewardCode({ rewardCode, giftCodeName: PARVANDE_ZAMINGIR_GIFT_CODE_NAME })
	}

	useEffect(() => {
		if (result.isSuccess) {
			setRewardCode('');
			const rewardCount = (result.data as any).reward[PARVANDE_ZAMINGIR_COIN]
			dialogService.open({
				component:
					<CustomDialogContent
						image={<ScoreAnnouncement />}
						title={`تبریک! کد جایزه رو زدی و ${toPersianNumber(rewardCount)} سکه گرفتی. باریکلا`}
						onClick={() => {
							dialogService.close();
						}}
					/>
			})
		}
		if (result.isError) {
			if (result.error?.['data']?.message) {
				dialogService.open({
					component:
						<CustomDialogContent
							title={result.error['data'].message}
							onClick={() => {
								dialogService.close();
							}}
						/>
				})
			}
		}
	}, [result])

	return (
		<Stack
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={2}
			sx={{ background: 'rgba(0, 0, 0, 0.4)' }}
			padding={1}
			spacing={1}
		>
			<TextField
				inputProps={{
					dir: 'ltr',
					maxLength: 11,
					inputMode: 'numeric',
					type: 'tel',
				}}
				value={rewardCode}
				onChange={(e) => setRewardCode(toEnglishNumber(e.target.value))}
				fullWidth
				variant='outlined'
				size='small'
			/>
			<Button
				fullWidth
				disabled={!Boolean(rewardCode)}
				variant='contained'
				onClick={handleSubmitRewardCode}
			>
				<Typography noWrap color={'black'} fontSize={12} fontWeight={800}>
					{`دریافت جایزه`}
				</Typography>
			</Button>
		</Stack >
	);
}

export default RewardCodes;