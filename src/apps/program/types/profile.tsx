export type ProgramProfileType = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  national_code: string | null;
  birth_date: string | null;
  gender: 'M' | 'F' | null;
  referral_method: string;
  school: string;
  province: string | null;
  city: string | null;
  phone_number: string | null;
  postal_code: string | null;
  address: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
  has_received_reward: boolean;
  profile_completion_count_from_28Nov: number;
}