export interface MeetingType {
  id: number;
  meeting_id: string;
  title: string;
  description?: string;
  program: number;
  creator: string;
  // we’re binding to `start_time` not `start_date`
  start_time: string;          // e.g. "2025-05-14T13:45:00"
  // component treats duration as an HH:mm:ss string
  duration: string;            // e.g. "01:30:00"
  status: 'scheduled' | 'ongoing' | 'ended' | 'canceled';
  location_type: 'online' | 'physical' | 'hybrid';
  recording_url?: string;
  created_at: string;
  updated_at: string;
}
