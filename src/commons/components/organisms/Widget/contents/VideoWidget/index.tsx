import React, { useRef, useEffect } from 'react';
import VideoEditWidget from './edit';
import { useSendContentLogMutation } from 'commons/redux/apis/engagement/ContentLog';

export { VideoEditWidget };

interface VideoWidgetProps {
  link: string;
  id: string;
  contentId: string;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({ link, id: contentId }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [sendContentLog] = useSendContentLogMutation();
  // استفاده از مجموعه برای ذخیره زمان‌هایی که لاگ شده‌اند
  const loggedTimesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(video!.currentTime);

      // چک می‌کنیم اگر زمان فعلی مضرب ۱۰ ثانیه است و قبلاً لاگ نشده
      if (currentTime % 10 === 0 && !loggedTimesRef.current.has(currentTime)) {
        loggedTimesRef.current.add(currentTime);

        // ارسال لاگ به بک‌اند
        sendContentLog({
          content_id: contentId,
          event_type: currentTime === 0 ? 'play' : 'progress',
          details: { time: currentTime },
        });
      }
    };

    const handleEnded = () => {
      // وقتی ویدئو به پایان رسید، فرض می‌کنیم کاربر کل ویدئو را تماشا کرده است.
      sendContentLog({
        content_id: contentId,
        event_type: 'completed',
        details: { time: video!.duration },
      });
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [contentId, sendContentLog]);

  return (
    <video
      ref={videoRef}
      onContextMenu={(e) => { e.preventDefault(); }}
      controlsList="nodownload"
      controls
      src={link}
      style={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: 500,
        objectFit: 'contain'
      }}
    />
  );
};

export default VideoWidget;