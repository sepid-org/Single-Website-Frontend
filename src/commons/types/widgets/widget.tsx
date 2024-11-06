import { WidgetModes } from "commons/components/organisms/Widget";
import { HintType } from "commons/types/global";
import { ObjectType } from "../object/object";

export type WidgetTypes =
  'TextWidget' |
  'Image' |
  'Video' |
  'Aparat' |
  'Iframe' |
  'SmallAnswerProblem' |
  'BigAnswerProblem' |
  'MultiChoiceProblem' |
  'UploadFileProblem';

export type PositionType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type WidgetType = ObjectType & {
  name: string;
  mode: WidgetModes;
  widget_type: WidgetTypes;
  hints: HintType[];
  is_hidden: boolean;
}