import { Box, Button, Grid, Paper, Tooltip, Typography, Stack, IconButton, Container } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { useCreateFSMStateHintMutation, useCreateWidgetHintMutation, useDeleteFSMStateHintMutation, useDeleteWidgetHintMutation, useGetFSMStateHintsQuery, useGetWidgetHintsQuery } from 'apps/website-display/redux/features/hint/HintSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import { PaperEditor } from 'commons/template/Paper';

type HintsEditorPropsType = {
  type: 'widget' | 'state';
  referenceId: string;
}

const HintsEditor: FC<HintsEditorPropsType> = ({
  type = 'state',
  referenceId,
}) => {
  const t = useTranslate();
  const { data: widgetHints = [] } = useGetWidgetHintsQuery({ widgetId: referenceId }, { skip: type === 'state' })
  const { data: stateHints = [] } = useGetFSMStateHintsQuery({ fsmStateId: referenceId }, { skip: type === 'widget' })
  const hints = type === 'state' ? stateHints : widgetHints;
  const [deleteDialogId, setDeleteDialogId] = useState<string>(null);
  const [createHint] = useCreateFSMStateHintMutation();
  const [deleteHint] = useDeleteFSMStateHintMutation();
  const [createWidgetHint] = useCreateWidgetHintMutation();
  const [deleteWidgetHint] = useDeleteWidgetHintMutation();

  return (
    <Container maxWidth='md' sx={{ paddingY: 2 }}>
      <Stack spacing={2} width='100%'>
        <Typography variant="h2" gutterBottom>
          {'راهنمایی‌ها'}
        </Typography>
        {hints?.length > 0 ?
          <Stack>
            <Grid container alignItems='stretch' spacing={2}>
              {hints.map((hint, index) => (
                <Grid item key={index} xs={12} md={6}>
                  <Paper sx={{ padding: 1 }} key={hint.id} elevation={3}>
                    <Stack spacing={1}>
                      <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography>{t('helpNumber') + " " + toPersianNumber(index + 1)}</Typography>
                        <Box>
                          <Tooltip title='حذف راهنمایی' arrow>
                            <IconButton size='small' onClick={() => setDeleteDialogId(hint.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Stack>
                      <PaperEditor paperId={hint.id} />
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
          :
          <NoDataFound variant={4} message='راهنمایی‌ای وجود ندارد' />
        }
        <Button
          fullWidth
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => type === 'state' ? createHint({ fsmStateId: referenceId }) : createWidgetHint({ widgetId: referenceId })}>
          {t('createHelp')}
        </Button>
      </Stack>
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(null)}
        callBackFunction={() => type === 'state' ? deleteHint({ fsmStateId: referenceId, hintId: deleteDialogId }) : deleteWidgetHint({ hintId: deleteDialogId })}
      />
    </Container>
  );
}

export default HintsEditor;
