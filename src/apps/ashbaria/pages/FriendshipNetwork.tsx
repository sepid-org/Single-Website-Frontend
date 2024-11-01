import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import background from "../assets/friendsNetworkBg.svg";
import BackButton from '../components/molecules/buttons/Back';
import { useCompleteMissionMutation, useFollowMutation, useGetMissionsQuery, useGetMyCompletedMissionsQuery, useGetMyFriendshipNetworkQuery } from 'apps/ashbaria/redux/slices/FriendshipNetwork';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from 'apps/film-bazi/components/organisms/CustomDialogContent';
import ScoreAnnouncement from 'apps/film-bazi/components/atoms/icons/ScoreAnnouncement';
import { toPersianNumber } from 'commons/utils/translateNumber';
import HeartIcon from '../components/atoms/icons/Heart';
import ExclamationIcon from '../components/atoms/icons/Exclamation';
import FriendshipNetworkPoints from '../components/molecules/FriendshipNetworkPoint';
import CopyIcon from '../components/atoms/icons/Copy';
import CompletedMission from '../components/molecules/friendship-network/CompletedMission';
import UncompletedMission from '../components/molecules/friendship-network/UncompletedMission';
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';

const FriendshipNetworkPage = () => {
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const { data: missions } = useGetMissionsQuery()
  const { data: myCompletedMissions } = useGetMyCompletedMissionsQuery()
  const [follow, followResult] = useFollowMutation();
  const [completeMission, completeMissionResult] = useCompleteMissionMutation();
  const [inputCode, setInputCode] = useState('');
  const [myCode, setMyCode] = useState('');

  //create skeleton istead and delete states and useEffect
  const [unCompletedMissions, setUnCompletedMissions] = useState([]);
  useEffect(() => {
    if (missions) {
      setUnCompletedMissions(missions);
    }
  }, [missions]);

  //create skeleton istead and delete states and useEffect
  const [completedMissions, setCompletedMissions] = useState([]);
  useEffect(() => {
    if (myCompletedMissions) {
      setCompletedMissions(myCompletedMissions);
      if (missions) {
        setUnCompletedMissions(missions.filter(item1 => !myCompletedMissions.some(item2 => item2.id === item1.id)));
      }
    }
  }, [myCompletedMissions, missions]);

  //create skeleton istead and delete states and useEffect
  const [followingInfo, setFollowingInfo] = useState({
    be_followed_reward_score: "",
    follow_reward_score: "",
    user_followers_count: "",
    user_followings_count: "",
  });
  useEffect(() => {
    if (myFriendshipNetwork) {
      setMyCode(myFriendshipNetwork.code.code);
      setFollowingInfo({
        be_followed_reward_score: myFriendshipNetwork.network.be_followed_reward_score.toString(),
        follow_reward_score: myFriendshipNetwork.network.follow_reward_score.toString(),
        user_followers_count: myFriendshipNetwork.network.user_followers_count.toString(),
        user_followings_count: myFriendshipNetwork.network.user_followings_count.toString(),
      });
    }
  }, [myFriendshipNetwork]);

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

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myCode);
  };

  const shareOnMobile = () => {
    if (navigator.share) {
      navigator.share({
        text: myCode,
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
    <FullScreenBackgroundImage image={background}>
      <Container maxWidth='md' component={Paper} sx={{ position: 'relative', paddingY: 2 }}>
        <Grid container spacing={2}>
          <Grid container item alignItems={'center'} justifyContent={'center'}>
            <Box position={'absolute'} left={10} top={10}>
              <BackButton />
            </Box>
            <Stack direction={'row'} alignItems={'center'}>
              <HeartIcon />
              <Typography variant="h6" fontSize={24} fontWeight={800}>
                {'حلقه دوستان'}
              </Typography>
            </Stack>
            <Box position={'absolute'} right={10} top={5}>
              <IconButton color="inherit">
                <ExclamationIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid container item spacing={3} alignItems={'stretch'} justifyContent={'center'}>
            {/* Right Component */}
            <Grid item xs={12} sm={6}>
              <Stack
                height={'100%'}
                spacing={2}
                padding={2}
                borderRadius={2}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                justifyContent={'space-between'}
              >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography fontSize={16} fontWeight={600}>
                    {'کد دوستاتو بزن!'}
                  </Typography>
                  <FriendshipNetworkPoints
                    points={followingInfo.follow_reward_score}
                    numberOfFriends={followingInfo.user_followings_count}
                  />
                </Stack>
                <Typography fontSize={16} fontWeight={400}>
                  اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی ۱۰ تا اعتبار می‌ارزه
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="کد ۱۰ رقمی"
                  onChange={(event) => setInputCode(event.target.value)}
                />
                <Button variant='outlined' size='large' onClick={() => follow({ code: inputCode })}>
                  {'ثبتش کن'}
                </Button>
              </Stack>
            </Grid>

            {/* Left Component */}
            <Grid item xs={12} sm={6}>
              <Stack
                height={'100%'}
                spacing={2}
                padding={2}
                borderRadius={2}
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                justifyContent={'space-between'}
              >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography fontSize={16} fontWeight={600}>
                    {'به دوستات کد بده!'}
                  </Typography>
                  <FriendshipNetworkPoints
                    numberOfFriends={followingInfo.user_followers_count}
                    points={followingInfo.follow_reward_score}
                  />
                </Stack>
                <Typography fontSize={16} fontWeight={400}>
                  هر کسی کد اختصاصی تو رو بزنه، هم اون اعتبار میگیره هم تو!
                </Typography>
                <Stack
                  paddingLeft={1}
                  direction={'row'}
                  borderRadius={1}
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography fontSize={16} fontWeight={400}>
                    {'کد اختصاصی تو:'}
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Typography>{myCode}</Typography>
                    <IconButton onClick={copyToClipboard} color="inherit">
                      <CopyIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Button variant='contained' size='large' onClick={handleShare} fullWidth>
                  {'ارسال دعوت‌نامه'}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {/* Missions Section */}
          <Grid item xs={12}>
            <Typography fontSize={16} fontWeight={600} gutterBottom>
              {'ماموریت‌های کدزنی'}
            </Typography>
            <Stack
              spacing={2}
              direction={'row-reverse'}
              overflow={'auto'}
              sx={{
                width: '100%',
                paddingBottom: 2,
                borderRadius: '8px',
                '::-webkit-scrollbar': {
                  height: '8px',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: '#b0bec5',
                  borderRadius: '8px',
                },
                '::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#90a4ae',
                },
              }}
            >
              {unCompletedMissions.map(record => (
                <UncompletedMission key={record.id} requiredFollows={record.required_follows} rewardScore={record.reward_score} completable={record.required_follows <= parseInt(followingInfo.user_followings_count)} handleClick={completeMission} id={record.id} />
              ))}
              {completedMissions.map(record => (
                <CompletedMission key={record.id} requiredFollows={record.required_follows} rewardScore={record.reward_score} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </FullScreenBackgroundImage>
  );
};

export default FriendshipNetworkPage;