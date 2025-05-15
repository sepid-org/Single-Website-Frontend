import { toPersianNumber } from "commons/utils/translateNumber";
import moment from 'moment-jalaali';

// Format duration string 'HH:mm:ss' into a readable label
export const formatDuration = (duration: string) => {
  const [hours, minutes] = duration.split(':').map(Number);
  if (hours) {
    if (minutes) {
      return `${toPersianNumber(hours)}ساعت و ${toPersianNumber(minutes)} دقیقه`;
    } else {
      return `${toPersianNumber(hours)} ساعت`;
    }
  } else {
    return `${toPersianNumber(minutes)} دقیقه`;
  }
};

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

// Format start time (HH:mm)
export const formatStart = (iso: string) => moment(iso).format('HH:mm');
