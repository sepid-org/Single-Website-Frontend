import { toEnglishNumber } from "./translateNumber";

const formatPhoneNumber = (phoneNumber: string): string | null => {
  // تبدیل شماره به انگلیسی
  let value = toEnglishNumber(phoneNumber);

  // حذف فاصله‌ها و کاراکترهای غیرمجاز
  value = value.replace(/[\s-]/g, '');

  // اگر شماره با +98 شروع شود، آن را به 09 تغییر می‌دهیم
  if (value.startsWith('+98')) {
    value = '0' + value.slice(3);
  }
  // اگر شماره با 98 شروع شود، آن را نیز به 09 تغییر می‌دهیم
  else if (value.startsWith('98')) {
    value = '0' + value.slice(2);
  }
  // اگر شماره با 9 شروع شود، پیشوند 0 را اضافه می‌کنیم
  else if (value.startsWith('9')) {
    value = '0' + value;
  }

  // بررسی فرمت نهایی (باید با 09 شروع شود و دقیقاً 11 رقم باشد)
  if (/^09[0-9]{9}$/.test(value)) {
    return value;
  }

  // اگر شماره معتبر نباشد، null برمی‌گردانیم
  return null;
};


export default formatPhoneNumber;