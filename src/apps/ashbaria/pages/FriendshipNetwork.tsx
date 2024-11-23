import React, { useEffect, useState, useRef } from 'react';
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
import BackButton from '../components/molecules/buttons/Back';
import { useCompleteMissionMutation, useFollowMutation, useGetMissionsQuery, useGetMyCompletedMissionsQuery, useGetMyFriendshipNetworkQuery } from 'apps/ashbaria/redux/slices/FriendshipNetwork';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from 'commons/components/molecules/CustomDialogContent';
import ScoreAnnouncement from 'apps/film-bazi/components/atoms/icons/ScoreAnnouncement';
import { toEnglishNumber, toPersianNumber } from 'commons/utils/translateNumber';
import HeartIcon from '../components/atoms/icons/Heart';
import ExclamationIcon from '../components/atoms/icons/Exclamation';
import FriendshipNetworkPoints from '../components/molecules/friendship-network/FriendshipNetworkPoint';
import CopyIcon from '../components/atoms/icons/Copy';
import CompletedMission from '../components/molecules/friendship-network/CompletedMission';
import UncompletedMission from '../components/molecules/friendship-network/UncompletedMission';
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import SendInvitation from '../components/molecules/friendship-network/SendInvitation';
import { Golden } from '../constants/colors';
import copyToClipboard from 'commons/utils/CopyToClipboard';
import BookMission from '../components/molecules/friendship-network/BookMission';
import { ASHBARIA_SUBMIT_FRIENDSHIP_CODE } from '../constants/game-info';
import { MediaUrls } from '../constants/mediaUrls';

const FriendshipNetworkPage = () => {
  const { data: myFriendshipNetwork } = useGetMyFriendshipNetworkQuery()
  const { data: missions } = useGetMissionsQuery()
  const { data: myCompletedMissions } = useGetMyCompletedMissionsQuery()
  const [follow, followResult] = useFollowMutation();
  const [completeMission, completeMissionResult] = useCompleteMissionMutation();
  const [inputCode, setInputCode] = useState('');

  const unCompletedMissions = missions?.filter(mission => !myCompletedMissions?.some(completedMission => completedMission.id === mission.id));

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

  const copyToClipboardWrapper = () => {
    if (myFriendshipNetwork) {
      copyToClipboard(myFriendshipNetwork.code.code, 'کد دعوت اختصاصیت با موفقیت کپی شد');
    }
  };

  return (
    <FullScreenBackgroundImage image={MediaUrls.WALL}>
      <Container maxWidth='md' component={Paper} sx={{ position: 'relative', paddingY: 2 }}>
        <Grid container spacing={2}>
          <Grid container item alignItems={'center'} justifyContent={'center'}>
            <Box position={'absolute'} left={10} top={10}>
              <BackButton />
            </Box>
            <Stack direction={'row'} alignItems={'center'}>
              <HeartIcon />
              <Typography fontSize={24} fontWeight={800}>
                {'حلقه دوستان'}
              </Typography>
            </Stack>
            {/* <Box position={'absolute'} right={10} top={2}>
              <IconButton color="inherit">
                <ExclamationIcon />
              </IconButton>
            </Box> */}
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
                    points={myFriendshipNetwork?.network.follow_reward_score}
                    numberOfFriends={myFriendshipNetwork?.network.user_followings_count}
                  />
                </Stack>
                <Typography fontSize={16} fontWeight={400}>
                  {`اگه از دوستات کد معرف گرفتی، بزنش اینجا. هر کدی ${ASHBARIA_SUBMIT_FRIENDSHIP_CODE(myFriendshipNetwork?.network.is_huge)} تا اعتبار می‌ارزه`}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="کد ۱۰ حرفی"
                  inputProps={{
                    maxLength: 10,
                  }}
                  onChange={(event) => setInputCode(toEnglishNumber(event.target.value))}
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
                    numberOfFriends={myFriendshipNetwork?.network.user_followers_count}
                    points={myFriendshipNetwork?.network.be_followed_reward_score}
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
                  <Typography fontSize={12} fontWeight={400} color={Golden}>
                    {'کد اختصاصی تو:'}
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} padding={1} spacing={0.5}>
                    <Typography>{myFriendshipNetwork?.code?.code}</Typography>
                    <IconButton sx={{ padding: 0 }} onClick={copyToClipboardWrapper} color="inherit">
                      <CopyIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <SendInvitation />
              </Stack>
            </Grid>
          </Grid>

          {/* Missions Section */}
          <Grid item xs={12}>
            <Typography fontSize={16} fontWeight={600} gutterBottom>
              {'ماموریت‌های اشتراک‌گذاری کد'}
            </Typography>
            <Stack direction={'row-reverse'} spacing={2}>
              <BookMission />

              <ScrollableStack>
                {myCompletedMissions?.map(record => (
                  <CompletedMission
                    key={record.id}
                    requiredFollows={record.required_follows}
                    rewardScore={record.reward_score}
                  />
                ))}
                {unCompletedMissions?.map(record => (
                  <UncompletedMission
                    key={record.id}
                    requiredFollows={record.required_follows}
                    rewardScore={record.reward_score}
                    completable={record.required_follows <= myFriendshipNetwork?.network.user_followers_count}
                    handleClick={completeMission} id={record.id}
                  />
                ))}
              </ScrollableStack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </FullScreenBackgroundImage>
  );
};

export default FriendshipNetworkPage;


function ScrollableStack({ children }) {
  const stackRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (stackRef.current) {
        setIsScrollable(stackRef.current.scrollWidth > stackRef.current.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  return (
    <Stack
      ref={stackRef}
      spacing={2}
      direction={'row-reverse'}
      overflow={'auto'}
      sx={{
        width: '100%',
        borderRadius: '8px',
        paddingBottom: isScrollable ? 1.5 : 0,
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
      {children}
    </Stack >
  );
}
