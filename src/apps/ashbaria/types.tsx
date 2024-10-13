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
