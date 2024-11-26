import { Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Golden } from "apps/ashbaria/constants/colors";
import { useSubmitRewardCodeMutation } from "apps/ashbaria/redux/slices/FriendshipNetwork";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import InfoIcon from '@mui/icons-material/Info';
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";

const RewardCodeMission = ({ }) => {
	const [rewardCode, setRewardCode] = useState<string>('');
	const [submitRewardCode, result] = useSubmitRewardCodeMutation();

	const handleSubmitRewardCode = () => {
		submitRewardCode({ rewardCode: rewardCode })
	}

	useEffect(() => {
		if (result.isSuccess) {
			setRewardCode('');
			const rewardCount = (result.data as any).reward[ASHBARIA_COIN]
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
			<Stack direction={'row'} alignContent={'center'} spacing={0.5}>
				<Typography noWrap textAlign={'center'} fontSize={18} color={Golden} fontWeight={800}>
					اگه کد ویژه داری، اینجا بزن
				</Typography>
				<Tooltip arrow title='منظور از کد ویژه، کد کتاب یا کدهای امتیازیه که در جاهای مختلف به‌دست آوردی و با زدنشون امتیاز کسب می‌کنی'>
					<IconButton sx={{ padding: 0 }}>
						<InfoIcon />
					</IconButton>
				</Tooltip>
			</Stack>
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

export default RewardCodeMission;