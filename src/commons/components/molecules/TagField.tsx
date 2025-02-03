import { Box, Chip, InputAdornment, TextField } from "@mui/material";
import { toPersianNumber } from "commons/utils/translateNumber";
import React, { useState } from "react";

const tagNumber = 5;

type TagFieldPropsType = {
	tags: string[];
	setTags: any;
}

const TagField: React.FC<TagFieldPropsType> = ({setTags, tags}) => {

	const [inputValue, setInputValue] = useState('');

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim() && tags.length < tagNumber) {
			event.preventDefault();
			setTags([...tags, inputValue.trim()]);
			setInputValue('');
		}
	};
	
	const handleDelete = (tagToDelete: string) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};

	return (
		<Box>
			<TextField
				variant="outlined"
				value={inputValue}
				label={'تگ‌ها را در این قسمت وارد کنید'}
				placeholder={tags.length < tagNumber ? `${toPersianNumber(tagNumber - tags.length)} تگ دیگر می‌توانید وارد کنید` : ''}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{tags.map((tag) => (
								<Chip
									key={tag}
									label={tag}
									onDelete={() => handleDelete(tag)}
									size="small"
									style={{ marginRight: 4 }}
								/>
							))}
						</InputAdornment>
					),
					endAdornment: tags.length >= tagNumber ? null : undefined,
				}}
				disabled={tags.length >= tagNumber}
			/>
		</Box>
	);
}

export default TagField;