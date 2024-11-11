export interface ScoreBoardItemType {
  rank: number;
  first_name: string;
  last_name: string;
  name: string;
  score: number;
  currentUser: boolean;
  id: string;
  profileImg?: string;
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
