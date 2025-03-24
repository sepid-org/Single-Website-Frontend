interface WinnerRecord {
  first_name: string;
  last_name: string;
  profile_image: string | null;
  score: number;
  user_id: string;
  currentUser?: boolean;
}

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
    winnerUsersInfo: WinnerRecord[];
  };
  winnerScores: WinnerRecord[];
}