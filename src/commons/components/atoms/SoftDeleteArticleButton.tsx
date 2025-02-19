import { IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSoftDeleteArticleMutation } from 'apps/website-display/redux/features/article/ArticleSlice';

type SoftDeleteArticleButtonPropsType = {}

const SoftDeleteArticleButton: FC<SoftDeleteArticleButtonPropsType> = ({ }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [softDeleteArticle, result] = useSoftDeleteArticleMutation();

  useEffect(() => {
    if (result?.isSuccess) {
      toast.success('مقاله با موفقیت حذف شد.');
      navigate(`/articles/`);
    }
  }, [result])

  return (
    <Fragment>
      <Tooltip arrow title='حذف مقاله'>
        <IconButton onClick={() => setOpenDialog(openDialog => !openDialog)} sx={{ padding: 0 }}>
          <DeleteIcon color='error' />
        </IconButton>
      </Tooltip>
      <AreYouSure
        text='آیا مطمئنید؟ با پاک‌کردن مقاله، تمامی محتوای آن پاک خواهد شد و دیگر قابل بازیابی نخواهد بود.'
        open={openDialog}
        callBackFunction={() => softDeleteArticle({ articleId })}
        handleClose={() => setOpenDialog(openDialog => !openDialog)} />
    </Fragment>
  );
}

export default SoftDeleteArticleButton;
