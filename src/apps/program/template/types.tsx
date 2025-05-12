export interface MeetingType {
  id: number;
  meeting_id: string;
  title: string;
  description?: string;
  program: number;
  creator: string;
  start_time: string;       // ISO datetime
  end_time: string;         // ISO datetime
  status: 'scheduled' | 'ongoing' | 'ended' | 'canceled';
  location_type: 'online' | 'physical' | 'hybrid';
  recording_url?: string;
  created_at: string;
  updated_at: string;
  duration: string;         // e.g. "01:00:00"
}
