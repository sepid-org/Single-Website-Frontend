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

type ResourcesType = {
  [resourceName: string]: number;
}

export type ResourcesTierType = {
  max: number | null;
  reward: ResourcesType;
};

export type NetworkConfigType = {
  tiers: {
    follow: ResourcesTierType[];
    be_followed: ResourcesTierType[];
  };
  follow_limit: number;
  be_followed_limit: number;
};

export type NetworkType = {
  id: number;
  name: string;
  description: string;
  configs: NetworkConfigType;
};

export type MembershipType = {
  user: string;
  user_followers_count: number;
  user_followings_count: number;
  code: string;
  created_at: string;
  resources: {
    follow_rewards: ResourcesType;
    be_followed_rewards: ResourcesType;
  };
  next_follow_reward: ResourcesType;
  next_be_followed_reward: ResourcesType;
};

export type FollowType = {
  follower: string;
  following: string;
  code?: MembershipType | null;
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