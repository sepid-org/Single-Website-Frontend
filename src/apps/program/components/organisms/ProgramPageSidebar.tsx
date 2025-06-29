import React, { FC, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import downloadFile from 'commons/utils/downloadFile';
import {
  getCertificateAction,
} from 'apps/website-display/redux/slices/programs';
import ProgramPageDashboardButton from 'commons/components/molecules/ProgramPageDashboardButton';
import ProgramContactInfo from 'commons/components/molecules/ProgramContactInfo';
import { useGetProgramQuery, useGetProgramUserPermissionsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import ShareProgramButton from 'commons/components/atoms/ShareProgramButton';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';
import { RegistrationFormType } from 'commons/types/models';
import { Button, Stack, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type ProgramPageSidebarPropsType = {
  getCertificate: any;
  otherButtons?: any[];
}

const ProgramPageSidebar: FC<ProgramPageSidebarPropsType> = ({
  getCertificate,
  otherButtons = [],
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm } = useGetFormQuery<{ data: RegistrationFormType }>(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );
  const { data: registrationReceipt } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );
  const { data: programPermissions } = useGetProgramUserPermissionsQuery({ programSlug });

  const [expanded, setExpanded] = useState(false);

  if (!program || !registrationForm) return null;

  // decide whether toggle is needed: more than 3 lines or long text
  const lineCount = program.description.split('\n').length;
  const showToggle = lineCount > 3 || program.description.length > 250;

  const doGetCertificate = () => {
    getCertificate({ receiptId: registrationReceipt.id }).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        downloadFile(
          action.payload.response.certificate,
          `گواهی حضور ${program.name}`,
          'image/jpeg'
        );
      }
    });
  };

  return (
    <Stack justifyContent="space-between" spacing={2}>
      <Stack spacing={1} sx={{ userSelect: 'none' }}>
        <img
          src={program.cover_image}
          alt="program-cover-page"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />

        <Typography variant="h2" component="h1" gutterBottom textAlign={'center'}>
          {program.name}
        </Typography>

        {/* توضیحات با انیمیشن باز/بسته یا ساده */}
        {showToggle ? (
          <Collapse in={expanded} collapsedSize="4.5em" timeout="auto">
            <Typography variant="body1" gutterBottom>
              {program.description}
            </Typography>
          </Collapse>
        ) : (
          <Typography variant="body1" gutterBottom>
            {program.description}
          </Typography>
        )}

        {/* دکمه مطالعه بیشتر */}
        {showToggle && (
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              textTransform: 'none',
              p: 0,
              minWidth: 0,
              width: 'fit-content',
              '& .MuiButton-startIcon': {
                marginRight: '4px'
              }
            }}
          >
            {expanded ? 'بستن' : 'مطالعه بیشتر'}
          </Button>
        )}
      </Stack>

      <ProgramContactInfo programContactInfo={program.program_contact_info} />

      <Stack spacing={2} justifyContent="space-between">
        {program.participation_type === 'Team' && (
          <Button
            size="large"
            variant="contained"
            color="info"
            fullWidth
            onClick={() => navigate(`/program/${programSlug}/team-setting/`)}
          >
            تیم‌بندی
          </Button>
        )}

        {registrationForm.has_certificate && (
          <Button
            size="large"
            disabled={!registrationForm.certificates_ready}
            onClick={doGetCertificate}
            color="info"
            variant="contained"
            fullWidth
          >
            گواهی حضور
          </Button>
        )}

        {program.show_scores && (
          <Button
            size="large"
            variant="contained"
            color="info"
            fullWidth
            onClick={() => navigate(`/program/${programSlug}/scoreboard`)}
          >
            جدول امتیازات
          </Button>
        )}

        {program.site_help_paper_id && (
          <ProgramPageDashboardButton
            paperId={program.site_help_paper_id}
            buttonLabel="راهنمای سایت"
          />
        )}

        {program.FAQs_paper_id && (
          <ProgramPageDashboardButton
            paperId={program.FAQs_paper_id}
            buttonLabel="سوالات متداول"
          />
        )}

        {programPermissions?.is_manager && (
          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={() => navigate(`/program/${programSlug}/manage/`)}
          >
            مدیریت دوره
          </Button>
        )}

        {otherButtons.map((button, index) => (
          <Fragment key={index}>{button}</Fragment>
        ))}
      </Stack>

      {/* <Stack alignItems="center">
        <ShareProgramButton />
      </Stack> */}
    </Stack>
  );
};

export default connect(
  null,
  { getCertificate: getCertificateAction }
)(ProgramPageSidebar);