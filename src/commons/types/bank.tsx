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
