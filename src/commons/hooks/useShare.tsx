import copyToClipboard from "commons/utils/CopyToClipboard";

const useShare = () => {

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const shareOnMobile = (textToShare) => {
    if (navigator.share) {
      navigator.share({
        text: textToShare,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  const share = (textToShare, successMessage = null, errorMessage = null) => {
    if (isMobileDevice()) {
      shareOnMobile(textToShare);
    } else {
      copyToClipboard(textToShare, successMessage, errorMessage);
    }
  }

  return {
    share,
  };
}

export default useShare;