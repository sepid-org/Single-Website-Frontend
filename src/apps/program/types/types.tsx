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

export interface MerchandiseType {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  discounted_price?: number | null;
  is_active: boolean;
  program: string;
}

export interface DiscountCodeType {
  id: number;
  code: string;
  value: number; // 0-1 (e.g. 0.3 means 30 %)
  max_discount_amount?: number | null;
}

export interface PurchaseType {
  amount: number;
  created_at: string; // ISO
  status: "Success" | "Started" | "Failed" | "Repetitious";
  merchandise: MerchandiseType;
  discount_code?: DiscountCodeType | null;
}