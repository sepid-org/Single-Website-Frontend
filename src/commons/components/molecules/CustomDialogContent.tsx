import React, { FC, Fragment } from "react";
import CustomDialogPaper from "apps/film-bazi/components/atoms/CustomDialogPaper";
import { Button, Stack, Typography } from "@mui/material";

type CustomDialogContentPropsType = {
  image?: string | any;
  title?: string;
  message?: string;
  onClick: any;
  onClickTitle?: string;
}

const CustomDialogContent: FC<CustomDialogContentPropsType> = ({
  image,
  title,
  message,
  onClick,
  onClickTitle,
}) => {
  return (
    <CustomDialogPaper>
      <Stack spacing={2} height={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        {typeof image === 'string' ?
          <img src={image} alt="" /> :
          <Fragment>
            {image}
          </Fragment>
        }
        <Stack>
          <Typography textAlign={'center'} fontWeight={700} fontSize={20} color={'white'} gutterBottom>
            {title}
          </Typography>
          <Typography textAlign={'center'} fontWeight={700} fontSize={14} color={'white'}>
            {message}
          </Typography>
        </Stack>
        <Button variant='outlined' fullWidth onClick={onClick}>
          {onClickTitle || 'متوجه شدم'}
        </Button>
      </Stack>

    </CustomDialogPaper>
  )
}

export default CustomDialogContent;