import { toast } from "react-toastify";

const copyToClipboard = (text, successMessage = null, errorMessage = null) => {
  const defaultSuccessMessage = 'متن با موفقیت کپی شد';
  const defaultErrorMessage = 'مشکلی در کپی‌کردن متن وجود داشت';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () {
      toast.success(successMessage || defaultSuccessMessage);
    }, function (err) {
      toast.error(errorMessage || defaultErrorMessage);
    });
  } else {
    toast.error(errorMessage || defaultErrorMessage);
  }
}

export default copyToClipboard;