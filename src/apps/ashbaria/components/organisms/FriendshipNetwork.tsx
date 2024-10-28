import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  Grid,
  Paper,
} from '@mui/material';
import bg from "../../assets/friendsNetworkBg.svg";
import BackButton from '../molecules/buttons/Back';
import { useCompleteMissionMutation, useFollowMutation, useGetMissionsQuery, useGetMyCompletedMissionsQuery, useGetMyFriendshipNetworkQuery } from 'apps/ashbaria/redux/slices/FriendshipNetwork';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from 'apps/film-bazi/components/organisms/CustomDialogContent';
import ScoreAnnouncement from 'apps/film-bazi/components/atoms/icons/ScoreAnnouncement';
import { toPersianNumber } from 'commons/utils/translateNumber';
import HeartIcon from '../atoms/icons/Heart';
import ExclamationIcon from '../atoms/icons/Exclamation';
import FriendshipNetworkPoints from '../molecules/FriendshipNetworkPoint';
import CopyIcon from '../atoms/icons/Copy';
import CodingMission from '../molecules/CodingMission';

const FriendshipNetwork = () => {
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const { data: missions } = useGetMissionsQuery()
  const { data: myCompletedMissions } = useGetMyCompletedMissionsQuery()
  const [follow, followResult] = useFollowMutation();
  const [completeMission, completeMissionResult] = useCompleteMissionMutation();

  useEffect(() => {
    if (completeMissionResult.isError) {
      if (completeMissionResult.error?.['data']?.error) {
        dialogService.open({
          component:
            <CustomDialogContent
              title={completeMissionResult.error['data'].error}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
    if (completeMissionResult.isSuccess) {
      dialogService.open({
        component:
          <CustomDialogContent
            image={<ScoreAnnouncement />}
            title={`تبریک! این ماموریت رو با موفقیت انجام دادی. ${toPersianNumber(completeMissionResult.data.mission.reward_score)} امتیاز بهت اضافه شد`}
            onClick={() => {
              dialogService.close();
            }}
          />
      })
    }
  }, [completeMissionResult])

  useEffect(() => {
    if (followResult.isSuccess) {
      if (followResult.data.created) {
        dialogService.open({
          component:
            <CustomDialogContent
              image={<ScoreAnnouncement />}
              title={`تبریک! تو کد دوستت رو زدی و امتیازشو گرفتی. باریکلا`}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
    if (followResult.isError) {
      if (followResult.error?.['data']?.error) {
        dialogService.open({
          component:
            <CustomDialogContent
              title={followResult.error['data'].error}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
  }, [followResult])

  const myCode = 12121212;

  const records = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
  }));

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myCode.toString());
  };

  const shareOnMobile = () => {
    if (navigator.share) {
      navigator.share({
        text: myCode.toString(),
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  const handleShare = () => {
    if (isMobileDevice()) {
      shareOnMobile();
    } else {
      copyToClipboard();
    }
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth='lg' component={Paper}>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 1,
            }}
          >
            <BackButton />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HeartIcon />
              <Typography variant="h6" color="white" sx={{ ml: 1 }}>حلقه دوستان</Typography>
            </Box>
            <IconButton color="inherit">
              <ExclamationIcon />
            </IconButton>
          </Box>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
              margin: 0,
              gap: 2
            }}
          >
            {/* Right Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                height: "auto",
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  height: 36,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  کد دوستاتو بزن!
                </Typography>
                <FriendshipNetworkPoints points={129} numberOfFriends={12} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                    marginTop: 3,
                    height: 60,
                  }}
                  style={{
                    direction: "rtl",
                    textAlign: "right"
                  }}
                >
                  اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی 10 تا اعتبار می‌ارزه
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="کد ۱۰ رقمی"
                  sx={{
                    margin: 1,
                    '& .MuiOutlinedInput-root': {
                      height: 44,
                      width: 255,
                      maxWidth: "100%",
                    }
                  }}
                />
              </Box>
              <Button variant='outlined' size='large'>
                {'ثبتش کن'}
              </Button>
            </Grid>

            {/* Left Component */}
            <Grid
              item
              xs={11}
              sm={5}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height: "auto",
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: 36,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  sx={{
                    width: "100%",
                  }}
                >
                  به دوستات کد بده!
                </Typography>
                <FriendshipNetworkPoints numberOfFriends={1} points={9} />
              </Box>
              <Typography
                fontSize={16}
                fontWeight={400}
                sx={{
                  marginTop: 3,
                  height: 60,
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right"
                }}
              >
                هر کسی کد اختصاصی تو رو بزنه، هم اون اعتبار میگیره هم تو!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 1,
                  minWidth: 255,
                  maxWidth: "100%",
                  height: 44,
                  margin: 1,
                }}
              >
                <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                    width: 172,
                    heigh: 24,
                    marginLeft: 1
                  }}
                  style={{
                    direction: "rtl",
                    textAlign: "right"
                  }}
                >
                  کد اختصاصی تو
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>{myCode}</Typography>
                  <IconButton onClick={copyToClipboard} color="inherit">
                    <CopyIcon />
                  </IconButton>
                </Box>
              </Box>
              <Button variant='contained' size='large' onClick={() => { }} fullWidth>
                {'ارسال دعوت‌نامه'}
              </Button>
            </Grid>
          </Grid>

          {/* Records Section */}
          <Typography
            fontSize={16}
            fontWeight={600}
            sx={{
              textAlign: "left",
              margin: 2
            }}
          >
            ماموریت‌های کدزنی
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 2,
              overflowX: "auto",
            }}
          >
            {records.map(record => (
              <CodingMission missionID={record.id} />
            ))}
          </Box>
        </Container >
      </Box>
    </Fragment>
  );
};

export default FriendshipNetwork;