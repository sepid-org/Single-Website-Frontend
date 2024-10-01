import { ObjectLogicType } from "commons/types/models";
import { useSeatInfo } from "./useSeatInfo";
import { useSelectSeat } from "./useSelectSeat";
import useGetSeatSelections from "./useGetSeatSelections";
import { useEffect } from "react";
import dialogService from "commons/components/organisms/PortalDialog";

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

const useCinemaGameLogic = () => {
  const { seatInfo, fetchSeatInfo } = useSeatInfo();
  const { loading: selectSeatLoading, selectedSeat, selectSeat: _selectSeat, error: selectSeatError } = useSelectSeat();
  const { seatSelections, refetch: refetchSeatSelections } = useGetSeatSelections();

  const isSeatSelected = (seatName: string) => {
    return Boolean(seatSelections.find(seatSelection => seatSelection.seat.name === seatName))
  }

  const selectSeat = (seatName: string) => {
    _selectSeat(seatName);
  }

  useEffect(() => {
    if (!selectSeatLoading) {
      if (selectedSeat) {
        if (selectedSeat.score_reward) {
          dialogService.open({
            message: `آفرین! ${selectedSeat.score_reward} سکه به شما اضافه شد.`,
          })
        }
        if (selectedSeat.other_reward) {
          dialogService.open({
            message: `آفرین! ${selectedSeat.other_reward}`,
          })
        }
        refetchSeatSelections();
      }
      if (selectSeatError) {
        dialogService.open({
          message: selectSeatError,
        })
      }
    }
  }, [selectSeatLoading])

  const createSeat = (seatIndex: number) => {

    const seatName = `filmbazi-level1-seat${seatIndex}`;
    const fullSeatName = `filmbazi-level1-fullseat${seatIndex}`;
    const seatAndItsFullSeat: ObjectLogicType[] = [
      {
        ...common,
        objectName: seatName,
        sx: {
          display: isSeatSelected(seatName) ? 'none' : null,
        },
        onClick: (e) => {
          const target = e.target;
          selectSeat(seatName);
        }
      },
      {
        objectName: fullSeatName,
        sx: {
          display: isSeatSelected(seatName) ? null : 'none',
        }
      }
    ];
    return seatAndItsFullSeat;
  }

  const objectLogics: ObjectLogicType[] = [];
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(index => objectLogics.push(...createSeat(index)))

  return {
    objectLogics,
  }
}

export default useCinemaGameLogic;