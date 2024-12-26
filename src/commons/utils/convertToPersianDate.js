import { toPersianNumber } from "./translateNumber";

export default function convertToPersianDate(time) {
  const date = new Date(time);
  const persianDate = new Intl.DateTimeFormat('fa-IR').format(date);

	const hours = toPersianNumber(date.getHours());
  const minutes = toPersianNumber(date.getMinutes());

  let formattedTime = `${String(hours).padStart(2, '۰')}:${String(minutes).padStart(2, '۰')}`;

  return `${persianDate} ${formattedTime}`;
}
