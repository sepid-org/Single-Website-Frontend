export type ArtistType = {
  first_name: string;
  last_name: string;
}

export type CityType = {
  id: number;
  name: string;
}

export type FilmType = {
  id: number;
  name: string;
  image: string;
  director: ArtistType;
  description: string;
}

export type DiscountCodeType = {
  code: string;
  usage_count: number;
  max_uses: number;
  percentage: number;
  film: FilmType;
  usageCount: number;
  start_date: string;
  end_date: string;
}

type UUID = string; // UUIDField can be represented as a string
type Decimal = string; // DecimalField can be represented as a string for precision handling
type URL = string; // URLField can be represented as a string
type DateTime = string; // DateTimeField can be represented as a string in ISO format

export interface CurrencyType {
  id: number; // Django adds an id field to all models automatically
  title: string;
  name: string;
  logo: URL;
  description?: string | null; // Field is nullable
}

export interface TransactionType {
  id: number;
  uuid: UUID;
  party?: UUID | null; // Field is nullable
  created_at: DateTime;
  transaction_type: 'withdraw' | 'deposit';
}

export interface CurrencyAmountType {
  id: number;
  transaction: TransactionType;
  currency: CurrencyType;
  amount: Decimal;
}

export interface BalanceType {
  id: number;
  party: UUID;
  currency: CurrencyType;
  amount: Decimal;
  last_updated: DateTime;
}

export type BalancesType = {
  [key: string]: number;
};

export interface ScoreBoardItemType {
  rank: number;
  first_name: string;
  last_name: string;
  score: number;
  currentUser: boolean;
}

