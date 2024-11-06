import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const FullScreenPaper = styled(Paper)(({ theme }) => ({
  width: `calc(100vw - ${theme.spacing(8)})`,
  height: `calc(100vh - ${theme.spacing(8)})`,
  maxWidth: 'none',
  maxHeight: 'none',
}));

export default FullScreenPaper;