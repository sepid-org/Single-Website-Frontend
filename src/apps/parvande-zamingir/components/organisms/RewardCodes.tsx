import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import ScoreAnnouncement from "commons/components/atoms/icons/ScoreAnnouncement";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { useSubmitRewardCodeMutation } from "commons/redux/apis/incentive-service/RewardCode";
import { PARVANDE_ZAMINGIR_COIN, PARVANDE_ZAMINGIR_GIFT_CODE_NAME } from "apps/parvande-zamingir/constants/game-info";
import { useFSMContext } from "commons/hooks/useFSMContext";

const RewardCodes = ({ }) => {
	const { openDialog, closeDialog } = useFSMContext();
	const [rewardCode, setRewardCode] = useState<string>('');
	const [submitRewardCode, result] = useSubmitRewardCodeMutation();

	const handleSubmitRewardCode = () => {
		submitRewardCode({ rewardCode, giftCodeName: PARVANDE_ZAMINGIR_GIFT_CODE_NAME })
	}

	useEffect(() => {
		if (result.isSuccess) {
			setRewardCode('');
			const rewardCount = (result.data as any).reward[PARVANDE_ZAMINGIR_COIN]
			openDialog(
				<CustomDialogContent
					image={<ScoreAnnouncement />}
					title={`تبریک! کد جایزه رو زدی و ${toPersianNumber(rewardCount)} سکه گرفتی. باریکلا`}
					onClick={() => {
						closeDialog();
					}}
				/>
			);
		}
		if (result.isError) {
			if (result.error?.['data']?.message) {
				openDialog(
					<CustomDialogContent
						title={result.error['data'].message}
						onClick={() => {
							closeDialog();
						}}
					/>
				);
			}
		}
	}, [result])

	return (
		<Stack
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={2}
			padding={1}
			spacing={1}
		>
			<TextField
				inputProps={{
					dir: 'ltr',
					maxLength: 11,
					style: { padding: 8, fontSize: "1rem", textAlign: 'center' }
				}}
				placeholder={'کد ویژه رو اینجا بنویس'}
				value={rewardCode}
				onChange={(e) => setRewardCode(toEnglishNumber(e.target.value))}
				fullWidth
				variant='outlined'
			/>
			<Button
				fullWidth
				disabled={!Boolean(rewardCode)}
				variant='contained'
				onClick={handleSubmitRewardCode}
			>
				<Typography noWrap color={'black'} fontSize={12} fontWeight={800}>
					{`ثبت کد ویژه`}
				</Typography>
			</Button>
		</Stack >
	);
}

export default RewardCodes;