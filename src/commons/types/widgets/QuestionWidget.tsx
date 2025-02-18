import { WidgetModes } from "commons/components/organisms/Widget";
import { WidgetType } from "./widget";
import { AnswerType } from "commons/types/models";

export type QuestionWidgetType = WidgetType & {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  text: string;
  submittedAnswer: AnswerType;
  is_required: boolean;
}