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
  status: 'upcoming' | 'released' | 'finished';
  gisheh7_link: string;
}

export type DiscountCodeType = {
  code: string;
  usage_count: number;
  max_uses: number;
  bought_tickets: number;
  max_tickets_per_use: number;
  total_cost_paid: number;
  percentage: number;
  film: FilmType;
  start_date: string;
  end_date: string;
}

export interface SeatType {
  name: string;
  score_reward: string;
  other_reward: string;
}

export interface SeatSelectionType {
  id: number;
  seat: SeatType;
  user: string;
  created_at: string;
  updated_at: string;
}

export type GameType = {
  id: string;
  title: string;
  description: string;
  help_paper_id: number;
  image: string;
  link: string;
}

export interface CardType {
  id: number;
  image: string;
}

export interface StoryType {
  id: number;
  name: string;
  order: Array<number>;
  reward: number;
}

export interface AttemptType {
  id: number;
  story: StoryType | null;
  user: string;
  is_successful: boolean;
}

export interface MissionType {
  order: number;
  title: string;
  description: string;
  initial_cards: number[];
  does_order_matter: boolean;
  reward: number;
}