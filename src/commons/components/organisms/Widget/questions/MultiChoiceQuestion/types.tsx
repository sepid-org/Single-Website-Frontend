import { QuestionWidgetType } from "commons/types/widgets/QuestionWidget";
import { ChoiceType } from "../Choice/types";

export type MultiChoiceQuestionWidgetPropsType = {
  choices: ChoiceType[];
  max_selections: number;
  min_selections: number;
  disable_after_answer: boolean;
  randomize_choices: boolean;
} & QuestionWidgetType;

