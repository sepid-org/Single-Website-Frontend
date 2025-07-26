import { WidgetModes } from "../..";

export type ChoiceVariantType = 'checkbox' | 'radio';

export type ChoiceType = {
  id?: number;
  text: string;
  is_correct?: boolean;
  disabled?: boolean;
}

export type ChoicePropsType = {
  choice: ChoiceType;
  isSelected: boolean;
  onSelectionChange: any;
  variant?: ChoiceVariantType;
  inactive: boolean;
}

export type ChoiceEditorPropsType = {
  choice: ChoiceType;
  onSelectionChange: any;
  onDelete: any;
  onTextChange: any;
}