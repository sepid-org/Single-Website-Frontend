export interface CourtType {
  id: number;
  title: string;
  reward_score: number;
  corresponding_fsm: number;
  judge_verdict: string;
}

export type ProfileType = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  national_code: string | null;
  birth_date: string | null;
  gender: 'M' | 'F' | null;
  referral_method: 'FRIENDS' | 'SOCIAL' | 'SEARCH' | 'OTHER' | null;
  province: string | null;
  city: string | null;
  phone_number: string | null;
  postal_code: string | null;
  address: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
  has_received_reward: boolean;
  is_profile_complete: boolean;
}

export type UpdateProfileResponse = ProfileType & {
  reward_status: {
    reward_granted: boolean;
    message: string | null;
  };
}

export type UpdateProfileInput = Partial<Omit<ProfileType,
  'created_at' | 'updated_at' | 'has_received_reward' | 'is_profile_complete'
>>;


export type DocumentType = {
  id: string;
  title: string;
  court: string;
  fsm: string;
  papers: string[];
}

export type FriendshipNetworkType = {
  user: string; // UUID string
  follow_reward_score: number;
  be_followed_reward_score: number;
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
  required_invitations: number;
  reward_score: number;
};

export type CompletedMissionType = {
  user: string;
  mission: MissionType;
  completed_at: string;
};

