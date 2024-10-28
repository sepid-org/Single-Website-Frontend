import { WidgetModes } from "commons/components/organisms/Widget";
import { WidgetType } from "./widget";
import { AnswerType } from "commons/types/models";

export type ContentWidgetType = WidgetType & {
  id: number;
  text: string;
  mode: WidgetModes;
  submittedAnswer: AnswerType;
  is_required: boolean;
}