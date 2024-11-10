import { ResourceType } from "commons/types/models";

export interface CourtType {
  id: number;
  title: string;
  reward_score: number;
  corresponding_fsm: number;
  judge_verdict1: string;
  judge_verdict2: string;
  next_court_corresponding_fsm_id: number;
}

export type AshbariaProfileType = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  national_code: string | null;
  birth_date: string | null;
  gender: 'M' | 'F' | null;
  referral_method: string;
  province: string | null;
  city: string | null;
  phone_number: string | null;
  postal_code: string | null;
  address: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
  has_received_reward: boolean;
}

export type UpdateProfileResponse = AshbariaProfileType & {
  reward_status: {
    reward_granted: boolean;
    message: string | null;
  };
}

export type UpdateProfileInput = Partial<Omit<AshbariaProfileType,
  'created_at' | 'updated_at' | 'has_received_reward' | 'is_profile_complete'
>>;
export type AshbariaDocumentType = {
  id: number;
  title: string;
  content: {
    court_id: number;
    fsm_id: number;
    paper_id: number;
  }
}

export type FriendshipNetworkType = {
  user: string; // UUID string
  follow_reward_score: number;
  be_followed_reward_score: number;
  user_followers_count: number;
  user_followings_count: number;
};

export type CodeType = {
  user: string;
  code: string;
  code_type: 'FRIENDSHIP' | 'REFERRAL';
  created_at: string;
};

export type FollowType = {
  follower: string;
  following: string;
  code?: CodeType | null;
  created_at: string;
};

export type MissionType = {
  title: string;
  required_follows: number;
  reward_score: number;
  id: number;
};

export type CompletedMissionType = {
  user: string;
  mission: MissionType;
  completed_at: string;
};

export type ClassifiedDocumentsType = {
  [fsmId: string]: {
    courtName: string;
    enabled: boolean;
    documents: AshbariaDocumentType[];
  };
};