import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import verify from "../../assets/verify.svg";
import copyIcon from "../../assets/copy.svg";
import bg from "../../assets/friendsNetworkBg.svg";
import sendIcon from "../../assets/sms.svg";
import BackButton from '../molecules/buttons/Back';
import { useCompleteMissionMutation, useFollowMutation, useGetMissionsQuery, useGetMyCompletedMissionsQuery, useGetMyFriendshipNetworkQuery } from 'apps/ashbaria/redux/slices/FriendshipNetwork';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from 'apps/film-bazi/components/organisms/CustomDialogContent';
import ScoreAnnouncement from 'apps/film-bazi/components/atoms/icons/ScoreAnnouncement';
import { toPersianNumber } from 'commons/utils/translateNumber';
import HeartIcon from '../atoms/icons/Heart';
import ExclamationIcon from '../atoms/icons/Exclamation';
import FriendshipNetworkPoints from '../molecules/FriendsNetworkPoint';
import CustomOutlinedButton from '../molecules/buttons/CustomOutlinedButton';

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

  const handleCopy = () => {
    navigator.clipboard.writeText("Fixed Text Value");
  };

  const myCode = 12121212;

  const records = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    // text: Record ${index + 1},
    //score: Math.floor(Math.random() * 100),
  }));

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareOnMobile = (text: string) => {
    if (navigator.share) {
      navigator.share({
        text: text,
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
      shareOnMobile(myCode.toString());
    } else {
      copyToClipboard(myCode.toString());
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

          {/* Header */}
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
              margin: 0
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
              <Typography
                fontSize={16}
                fontWeight={400}
                sx={{
                  marginTop: 3,
                  height: 60
                }}
                style={{
                  direction: "rtl",
                  textAlign: "right"
                }}
              >
                اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی 10 تا اعتبار می‌ارزه
              </Typography>
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
                    }
                  }}
                />
              </Box>
              <CustomOutlinedButton buttonText='ثبتش کن' handleClick={() => { }} minWidth={80} fullWidth={false} />
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
                  height: 44,
                  margin: 1,
                }}
              >
                <Typography
                  sx={{
                    width: "172px",
                    heigh: "24px",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "23.86px",
                    textAlign: "right",
                    marginLeft: "5px"
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
                  <Typography>101001</Typography>
                  <IconButton onClick={handleShare} color="inherit">
                    <Box
                      component="img"
                      src={copyIcon}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "44px",
                  width: "257px",
                  margin: "15px",
                  borderRadius: "100px",
                  backgroundClip: "padding-box",
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(to right, #FE9C42, #E25100)",
                }}
              >
                <Button
                  sx={{
                    height: "42px",
                    width: "255px",
                    gap: "4px",
                    borderRadius: "100px",
                    backgroundColor: "#130e15",
                    backgroundClip: "padding-box",
                    color: "#FE9C42",
                    fill: "#FE9C42",
                    '&: hover': {
                      background: "linear-gradient(180deg, #FE9C42, #E25100)",
                      color: "black"
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={sendIcon}
                    width="20px"
                    height="20px"
                    color="rgba(255, 168, 0, 1)"
                  />
                  ارسال دعوت‌نامه
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Records Section */}
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24.92px",
              textAlign: "left",
              margin: "20px"
            }}
          >
            ماموریت‌های کدزنی
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: "10px",
              overflowX: "auto",
            }}
          >
            {records.map(record => (
              <Box
                key={record.id}
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                  heigh: "110px",
                  minWidth: "80px",
                  borderRadius: "12px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  flexShrink: 0
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    color: "rgba(255, 168, 0, 1)",
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: "36.27px",
                    textAlign: "center",
                  }}
                >
                  {record.id}
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "23.86px",
                    textAlign: "center"
                  }}
                >
                  {"ثبت موفق"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "8px",
                    marginRight: "5px",
                    marginTop: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 800,
                      lineHeight: "26.38px",
                      textAlign: "right"
                    }}
                  >
                    180
                  </Typography>
                  <Box
                    component="img"
                    src={verify}
                    width="40px"
                    height="40px"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Container >
      </Box>
    </Fragment>
  );
};

export default FriendshipNetwork;