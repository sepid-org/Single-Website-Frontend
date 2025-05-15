import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router';

import VerticalFSMCard from 'commons/components/organisms/cards/FSMVerticalCard';
import { toast } from 'react-toastify';
import FSMInfoForm from 'apps/program/components/organisms/forms/FSMInfo';
import { FSMType } from 'commons/types/models';
import { useCreateFSMMutation } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { StaticFiles } from 'commons/constants/mediaUrls';

type CreateFSMDialog = {
  open: boolean;
  handleClose: any;
}

const CreateFSMDialog: FC<CreateFSMDialog> = ({
  open,
  handleClose,
}) => {
  const t = useTranslate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [properties, setProperties] = useState<Partial<FSMType>>({
    name: '',
    description: '',
    fsm_learning_type: 'Unsupervised',
    fsm_p_type: 'Individual',
    cover_image: StaticFiles.TemplateImage,
    is_active: true,
    is_visible: true,
    card_type: 'vertical1',
    show_roadmap: true,
  });
  const [createFSM, result] = useCreateFSMMutation();

  const handleCreateFSM = () => {
    if (!properties.name) {
      toast.error('لطفاً نام کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_learning_type) {
      toast.error('لطفاً نوع آموزش کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_p_type) {
      toast.error('لطفاً وضعیت فردی یا تیمی بودن کارگاه را انتخاب کنید.');
      return;
    }
    createFSM({
      program: parseInt(program.id),
      ...properties,
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('کارگاه با موفقیت ساخته شد.');
      handleClose(false);
      setProperties({
        name: '',
        description: '',
        fsm_learning_type: 'Unsupervised',
        fsm_p_type: 'Individual',
        cover_image: StaticFiles.TemplateImage,
        is_active: true,
        is_visible: true,
        card_type: 'vertical1',
        show_roadmap: true,
      });
    }
  }, [result])

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>{'ایجاد کارگاه جدید'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={6} alignItems={'start'}>
          <Grid item container xs={12} md={8} spacing={2}>
            <Grid item>
              <Typography gutterBottom>
                {'مشخصات کارگاه را وارد کنید:'}
              </Typography>
            </Grid>
            <Grid item>
              <FSMInfoForm data={properties} setData={setProperties} />
            </Grid>
          </Grid>
          <Grid item container xs={12} md={4} spacing={2}
            sx={{ display: { xs: 'none', md: 'inline' } }}
          >
            <Grid item xs={12}>
              <Typography gutterBottom>{'خروجی کار:'}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ opacity: properties.is_visible ? 1 : 0.2 }}>
              <VerticalFSMCard fsm={properties} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClose();
            setProperties({
              name: '',
              description: '',
              fsm_learning_type: 'Unsupervised',
              fsm_p_type: 'Individual',
              cover_image: StaticFiles.TemplateImage,
              is_active: true,
              is_visible: true,
              card_type: 'vertical1',
              show_roadmap: true,
            });
          }}>
          {'انصراف'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateFSM}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateFSMDialog;
