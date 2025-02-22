import { Box, Chip, InputAdornment, TextField } from "@mui/material";
import { TagType } from "commons/types/redux/article";
import { toPersianNumber } from "commons/utils/translateNumber";
import React, { useState } from "react";

const MAXIMUM_TAG_NUMBER = 5;

type TagFieldPropsType = {
	tags: TagType[];
	setTags: any;
}
const TagField: React.FC<TagFieldPropsType> = ({ setTags, tags }) => {

	const [inputValue, setInputValue] = useState('');

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim() && tags.length < MAXIMUM_TAG_NUMBER) {
			event.preventDefault();
			setTags([...tags, inputValue.trim()]);
			setInputValue('');
		}
	};

	const handleDelete = (tagToDelete: TagType) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};

	return (
		<Box>
			<TextField
				variant="outlined"
				value={inputValue}
				label={'موضوعات مرتبط'}
				placeholder={tags.length < MAXIMUM_TAG_NUMBER ? `${toPersianNumber(MAXIMUM_TAG_NUMBER - tags.length)} موضوع دیگر می‌توانید وارد کنید` : ''}
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
				}}
				disabled={tags.length >= MAXIMUM_TAG_NUMBER}
			/>
		</Box>
	);
}

export default TagField;