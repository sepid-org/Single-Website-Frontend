/* =====================================================================
   ──  BASE TYPES
===================================================================== */

export interface AttributeBase<T extends string> {
  id?: number;
  title: string;
  description: string | null;
  order: number;
  type: T;
  attributes: AttributeType[];
}

/* =====================================================================
   ──  INTRINSIC ATTRIBUTES
===================================================================== */

type IntrinsicBase<T extends string> = AttributeBase<T> & {
  value: JSON;
};

export type IntrinsicAttributeType = IntrinsicBase<"IntrinsicAttribute">;

export type EnabledAttributeType = IntrinsicBase<"Enabled">;
export type ConditionAttributeType = IntrinsicBase<"Condition">;
export type CostAttributeType = IntrinsicBase<"Cost">;
export type RewardAttributeType = IntrinsicBase<"Reward">;
export type DefaultAttributeType = IntrinsicBase<"Default">;


/* =====================================================================
   ──  PERFORMABLE ACTIONS
===================================================================== */

type ActionBase<T extends string> = AttributeBase<T>;  // فعلاً فیلد اضافه ندارد

export type PerformableActionType = ActionBase<"PerformableAction">;

export interface TransitionType extends ActionBase<"Transition"> {
  destination_state_id?: number;
  is_backward?: boolean;
}
export type StartType = ActionBase<"Start">;
export type FinishType = ActionBase<"Finish">;
export type SubmissionType = ActionBase<"Submission">;
export type BuyType = ActionBase<"Buy">;
export type RewardingType = ActionBase<"Rewarding">;
export interface AnswerType extends ActionBase<"Answer"> {
  question_id: number;
  answer_type: "SmallAnswer" | "BigAnswer" | "MultiChoiceAnswer" | "UploadFileAnswer";
  provided_answer: any;
}


export type AttributeType =
  // Intrinsic
  | EnabledAttributeType
  | ConditionAttributeType
  | CostAttributeType
  | RewardAttributeType
  | DefaultAttributeType
  // Actions
  | TransitionType
  | StartType
  | FinishType
  | SubmissionType
  | BuyType
  | RewardingType
  | AnswerType;