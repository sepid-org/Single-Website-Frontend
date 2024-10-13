export interface ChoiceType {
  id?: number;
  text: string;
  box_size: 'ExtraSmall' | 'Small' | 'Medium' | 'Large' | 'ExtraLarge';
  is_correct: boolean;
  is_finisher: boolean;
}

export interface QuestionType {
  id?: number;
  name: string;
  court: number;
  maximum_choices_could_be_selected: number;
  choices: ChoiceType[];
}

// Court model
export interface Court {
  id: number;
  title: string;
  reward_score: number;
}

// Scenario model
export interface ScenarioType {
  id: number;
  question: number; // Foreign key to Question
  desired_choices: number[]; // Array of Choice ids
  least_count_of_correct_choices_must_be_selected: number | null;
  is_finisher: boolean;
  destination_state: string;
  reward_support_percentages: number[];
  order: number;
}

// Submission model
export interface SubmissionType {
  id: number;
  user: string; // UUID as string
  question: number; // Foreign key to Question
  choices: number[]; // Array of Choice ids
  created_at: string; // ISO date string
}

// UserCourtProgress model
export interface UserCourtProgressType {
  id: number;
  user: string; // UUID as string
  court: number; // Foreign key to Court
  total_reward_support_percentages: number[];
}

// Request and Response types for API calls

export interface CreateScenarioRequestType {
  question: number;
  desired_choices: number[];
  least_count_of_correct_choices_must_be_selected: number;
  is_finisher: boolean;
  destination_state: string;
  reward_support_percentages: number[];
  order: number;
}

export interface UpdateScenarioRequestType extends Partial<CreateScenarioRequestType> {
  id: number;
}

export interface EvaluateSubmissionRequestType {
  id: number; // Scenario id
  submission: {
    user: string;
    choices: number[];
  };
}

export interface EvaluateSubmissionResponseType {
  result: boolean;
}