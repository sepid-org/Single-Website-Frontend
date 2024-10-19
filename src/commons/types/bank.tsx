export interface ScoreBoardItemType {
  rank: number;
  first_name: string;
  last_name: string;
  score: number;
  currentUser: boolean;
  id: boolean
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
