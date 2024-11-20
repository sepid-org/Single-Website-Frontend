
export interface ScoreBoardRecordType {
  user_id: string;
  score: number;
}

export interface ScoreBoardItemType extends ScoreBoardRecordType {
  name: string;
  rank: number;
  currentUser: boolean;
  profileImg?: string;
  ref: any;
}

export type BalancesType = {
  [key: string]: number;
};

type URL = string;

export interface CurrencyType {
  id: string;
  title: string;
  name: string;
  logo: URL;
  description?: string;
}
