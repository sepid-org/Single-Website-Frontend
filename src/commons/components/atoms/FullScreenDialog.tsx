import { Dialog } from '@mui/material';
import { styled } from '@mui/system';

const FullScreenDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: theme.spacing(4),
    width: `calc(100% - ${theme.spacing(8)})`,
    height: `calc(100% - ${theme.spacing(8)})`,
    maxWidth: 'none',
    maxHeight: 'none',
  },
}));

export default FullScreenDialog;