export type AttributeType = {
  id?: number;
  title: string;
  description: string | null;
  order: number;
  type: string;
  attributes: AttributeType[];
};

export type IntrinsicAttributeType = AttributeType & {
  type: 'IntrinsicAttribute';
  value: any;
};

export type PerformableActionType = AttributeType & {
  type: 'PerformableAction';
}

export type TransitionType = PerformableActionType & {
  type: 'Transition';
  destination_state_id: number;
};