import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Widget from '../Widget';
import { WidgetModes } from '../Widget';
import {
  getAnswersForReviewAction
} from 'apps/website-display/redux/slices/workshop';
import { Answer } from 'commons/types/models';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type ReviewAnswersPropsType = {
  open: boolean;
  handleClose: any;
  getAnswersForReview: any;
  answers: Answer[];
}

const ReviewAnswers: FC<ReviewAnswersPropsType> = ({
  open,
  handleClose,
  getAnswersForReview,
  answers,
}) => {
  const { fsmId } = useFSMContext();;

  useEffect(() => {
    if (open) {
      getAnswersForReview({ fsmId });
    }
  }, [open])

  return (
    <Dialog disableScrollLock maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h1" gutterBottom align="center">
          {'پاسخ‌های شما'}
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {answers?.map((widget) => (
            <Grid item key={widget.id} xs={12}>
              <Widget
                paperId={widget.paper}
                mode={WidgetModes.Review}
                widget={widget}
              />
              <Divider style={{ marginTop: 20 }} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button onClick={() => handleClose()} fullWidth variant="contained" color="secondary">
            {'فهمیدم'}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  answers: state.workshop.answers,
});

export default connect(mapStateToProps,
  {
    getAnswersForReview: getAnswersForReviewAction,
  }
)(ReviewAnswers);
