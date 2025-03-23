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
  const lastAllowedTimeRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(video!.currentTime);

      // به‌روز رسانی آخرین زمان مجاز در صورتی که کاربر به جلو برود (با مشاهده واقعی)
      if (lastAllowedTimeRef.current < currentTime && currentTime < lastAllowedTimeRef.current + 2) {
        lastAllowedTimeRef.current = currentTime;
      }

      // ارسال آپدیت به بک‌اند هر ۱۰ ثانیه
      if (currentTime >= lastUpdateRef.current + 10) {
        lastUpdateRef.current = Math.floor(currentTime / 10) * 10;

        // ارسال لاگ به بک‌اند
        sendContentLog({
          content_id: contentId,
          event_type: 'progress',
          details: { time: currentTime },
        });
      }
    };

    const handleSeeking = (e: Event) => {
      const targetTime = (e.target as HTMLVideoElement).currentTime; // زمان هدف که کاربر به آن می‌رود
      // اگر زمان هدف از زمان مجاز بیشتر باشد، پخش را به زمان مجاز بازگردانید
      if (targetTime > lastAllowedTimeRef.current) {
        (e.target as HTMLVideoElement).currentTime = lastAllowedTimeRef.current;
      }
    };

    const handleEnded = () => {
      // وقتی ویدئو به پایان رسید، می‌توانیم فرض کنیم که کاربر کل ویدئو را تماشا کرده است.
      sendContentLog({
        content_id: contentId,
        event_type: 'completed',
        details: { time: video!.duration },
      });
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('seeking', handleSeeking);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('seeking', handleSeeking);
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
