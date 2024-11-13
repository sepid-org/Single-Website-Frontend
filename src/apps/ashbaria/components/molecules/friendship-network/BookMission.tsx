import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import VerifyIcon from "../../atoms/icons/Verify";
import { Golden } from "apps/ashbaria/constants/colors";
import { ASHBARIA_BOOK_COIN_REWARD, ASHBARIA_CHELO_TYPE } from "apps/ashbaria/constants/game-info";

const BookMission = ({ }) => {
	const [bookCode, setBookCode] = useState<string>('');
	const completed = false;

	const handleSubmitBookCode = () => {

	}

	return (
		<Stack
			alignItems={'center'}
			justifyContent={'space-between'}
			borderRadius={2}
			sx={{ background: completed ? 'linear-gradient(180deg, #FFEC88 100%, #FFA95A 100%)' : 'rgba(0, 0, 0, 0.4)' }}
			padding={1}
			spacing={1}
		>
			<Typography textAlign={'center'} fontSize={20} color={completed ? 'black' : Golden} fontWeight={800}>
				{completed ? 'کد کتاب' : 'کد کتابت رو اینجا بزن:'}
			</Typography>
			{completed ?
				<Fragment>
					<Typography
						align="center"
						sx={{
							fontSize: "16px",
							fontWeight: 400,
							lineHeight: "23.86px",
							textAlign: "center",
							color: "#2B1A42",
						}}
					>
						{"ثبت موفق"}
					</Typography>
					<Stack
						direction={'row'}
						alignItems={'center'}
						justifyContent={'center'}
						marginTop={1}
						borderRadius={4}
						padding={0.5}
						paddingX={1}
						sx={{
							boxShadow: "0px 4px 4px 0px #00000040",
							backgroundColor: "#00000080",
						}}
						spacing={0.5}
					>
						<Typography fontSize={16} fontWeight={800}>
							{ASHBARIA_BOOK_COIN_REWARD}
						</Typography>
						<VerifyIcon size={28} />
					</Stack>
				</Fragment> :
				<Fragment>
					<TextField
						inputProps={{
							dir: 'ltr',
							maxLength: 11,
							inputMode: 'numeric',
							type: 'tel',
						}}
						value={bookCode}
						onChange={(e) => setBookCode(e.target.value)}
						fullWidth
						variant='outlined'
						size='small'
					/>
					<Stack direction={'row'}>
						<Button
							sx={{
								borderBottomRightRadius: 0,
								borderTopRightRadius: 0,
							}}
							variant="outlined"
							size="small"
							onClick={handleSubmitBookCode}
						>
							<Stack spacing={0.5} direction={'row'} alignItems={'center'} justifyContent={'center'}>
								<Typography fontSize={12} fontWeight={800}>
									{`دریافت ${ASHBARIA_BOOK_COIN_REWARD}`}
								</Typography>
								<VerifyIcon size={28} />
							</Stack>
						</Button>
						<Button
							sx={{
								borderBottomLeftRadius: 0,
								borderTopLeftRadius: 0,
							}}
							href='https://qandilsch.ir/product/10-raz-ashbaria/'
							variant="outlined"
							size="small"
							onClick={handleSubmitBookCode}
						>
							{'خرید کتاب'}
						</Button>
					</Stack>
				</Fragment>
			}
		</Stack >
	);
}

export default BookMission;