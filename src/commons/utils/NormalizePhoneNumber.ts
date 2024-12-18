export const normalizePhoneNumber = (phoneNumber: string): string => {
  const persianToEnglishMap: { [key: string]: string } = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9"
  };

  const normalizeDigits = (number: string): string => {
    return number.replace(/[۰-۹]/g, (char) => persianToEnglishMap[char]);
  };

  let normalizedNumber = normalizeDigits(phoneNumber);

  if (normalizedNumber.startsWith("+98")) {
    normalizedNumber = "09" + normalizedNumber.slice(4);
  }

  return normalizedNumber;
};