import React, { FC, Fragment } from "react";
import { Button, Stack, Typography } from "@mui/material";
import CustomPaper from "../../atoms/CustomPaper";

type CustomDialogPropsType = {
  image?: string | any;
  title?: string;
  message?: string;
  onClick: any;
  onClickTitle?: string;
}

const CustomDialog: FC<CustomDialogPropsType> = ({
  image,
  title,
  message,
  onClick,
  onClickTitle,
}) => {
  return (
    <CustomPaper>
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

    </CustomPaper>
  )
}

export default CustomDialog;