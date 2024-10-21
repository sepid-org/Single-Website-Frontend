import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import { useEffect } from "react";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "../components/organisms/CustomDialogContent";
import { toPersianNumber } from "commons/utils/translateNumber";
import ScoreAnnouncement from "../components/atoms/icons/ScoreAnnouncement";
import RedSeatAnnouncement from "../components/atoms/icons/RedSeatAnnouncement";
import GraySeatAnnouncement from "../components/atoms/icons/GraySeatAnnouncement";
import { Button } from "@mui/material";
import MyScoresChip from "../components/atoms/MyScoresChip";
import useLocalNavigate from "./useLocalNavigate";
import MyChancesChip from "../components/atoms/MyChancesChip";
import { useGetMyBalancesQuery } from "commons/redux/slices/my-info/MyInfo";
import { useGetSeatSelectionsQuery, useSelectSeatMutation } from "../redux/slices/CinemaGame";

const hoverOnMouseEnter = (target) => {
  target.style.transform = 'scale(1.05)';
  target.style.transition = 'all 0.1s ease';
  target.style.cursor = 'pointer';
}

const hoverOnMouseLeave = (target) => {
  target.style.transform = 'scale(1)';
  target.style.transition = 'all 0.1s ease';
  target.style.cursor = 'default';
}

const common = {
  onMouseEnter: (e) => {
    const target = e.currentTarget;
    hoverOnMouseEnter(target);
  },

  onMouseLeave: (e) => {
    const target = e.currentTarget;
    hoverOnMouseLeave(target);
  },
}

const useCinemaGameLogic = ({
  openLoading,
  setOpenLoading,
}) => {
  const [selectSeat, { data: selectedSeat, isLoading: selectSeatLoading, error: selectSeatError }] = useSelectSeatMutation();
  const { data: seatSelections = [], refetch: refetchSeatSelections, isLoading: getSeatSelectionsLoading } = useGetSeatSelectionsQuery();
  const localNavigate = useLocalNavigate();

  const isSeatSelected = (seatName: string) => {
    return Boolean(seatSelections.find(seatSelection => seatSelection.seat.name === seatName))
  }

  useEffect(() => {
    if (selectSeatLoading || getSeatSelectionsLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [selectSeatLoading, getSeatSelectionsLoading])

  useEffect(() => {
    if (!selectSeatLoading) {
      if (selectedSeat) {
        if (selectedSeat.score_reward) {
          dialogService.open({
            component:
              <CustomDialogContent
                image={<ScoreAnnouncement />}
                title={`تبریک! ${selectedSeat.score_reward} سکه به شما اضافه شد.`}
                onClick={() => {
                  dialogService.close();
                }}
              />
          })
        }
        if (selectedSeat.other_reward) {
          dialogService.open({
            component:
              <CustomDialogContent
                image={<ScoreAnnouncement />}
                title={`تبریک! ${selectedSeat.other_reward}`}
                onClick={() => {
                  dialogService.close();
                }}
              />
          })
        }
        refetchSeatSelections();
      }
      if (selectSeatError) {
        dialogService.open({
          component:
            <CustomDialogContent
              image={<GraySeatAnnouncement />}
              title={'فرصت‌های انتخاب صندلیت تموم شده'}
              message={'برای به‌دست‌آوردن فرصت جدید، باید کد تخفیفت رو به دوستات بدی'}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }
    }
  }, [selectSeatLoading])

  const createSeat = (seatIndex: number) => {
    const seatName = `filmbazi-level1-seat${seatIndex}`;
    const fullSeatName = `filmbazi-level1-fullseat${seatIndex}`;
    const seatAndItsFullSeat: ComplementaryObjectType[] = [
      {
        ...common,
        title: `صندلی شماره ${seatIndex}`,
        name: seatName,
        sx: {
          display: isSeatSelected(seatName) ? 'none' : null,
        },
        logics: {
          onClick: (e) => {
            dialogService.open({
              component:
                <CustomDialogContent
                  image={<GraySeatAnnouncement />}
                  title={`آیا از انتخاب صندلی شماره ${toPersianNumber(seatIndex)} مطمئن هستی؟`}
                  onClickTitle={'آره مطمئنم'}
                  onClick={() => {
                    dialogService.close();
                    selectSeat({ seatName });
                  }}
                />
            })
          }
        }
      },
      {
        name: fullSeatName,
        sx: {
          display: isSeatSelected(seatName) ? null : 'none',
        },
        logics: {
          onClick: () => {
            dialogService.open({
              component:
                <CustomDialogContent
                  image={<RedSeatAnnouncement />}
                  title={'شما قبلاً این صندلی را انتخاب کرده‌اید'}
                  onClick={() => {
                    dialogService.close();
                  }}
                />
            })
          }
        }
      }
    ];
    return seatAndItsFullSeat;
  }

  const myScoreChip: ComplementaryObjectType = {
    name: 'filmbazi-my-score-badge',
    substituteComponent: <MyScoresChip />
  }

  const myChancesChip: ComplementaryObjectType = {
    name: 'filmbazi-my-chances-badge',
    substituteComponent: <MyChancesChip />
  }

  const returnToDashboardButton: ComplementaryObjectType = {
    name: 'filmbazi-return-to-dashboard-button',
    substituteComponent:
      <Button
        variant='outlined'
        fullWidth
        sx={{ height: 40 }}
        onClick={() => localNavigate('/games/')}
      >
        {'بازگشت'}
      </Button>
  }

  const seats: ComplementaryObjectType[] = [];
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(index => seats.push(...createSeat(index)))

  return {
    complementaryObjects: [
      ...seats,
      myScoreChip,
      myChancesChip,
      returnToDashboardButton,
    ]
  }
}

export default useCinemaGameLogic;