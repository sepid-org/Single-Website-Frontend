export interface CompetitionScoresProps {
  allScores: {
    currentUser: {
      first_name: string;
      last_name: string;
      user_id: string;
      score: number;
      rank: null | number;
      currentUser: boolean;
    };
    currentUserExistsInWinners: boolean;
    winnerUsersInfo: TableRecordType[];
  };
  winnerScores: TableRecordType[];
}

export interface UserRecordType {
  user_id: string;
  score: number;
}

export interface TableRecordType extends UserRecordType {
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  profileImg?: string;
  name: string;
  rank: number;
  currentUser: boolean;
}