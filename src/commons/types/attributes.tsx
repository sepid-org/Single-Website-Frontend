export type AttributeBase = {
  id: number;
  title: string;
  description: string | null;
  order: number;
  model_type: string;
  attributes: AttributeBase[];
};

export type IntrinsicAttribute = AttributeBase & {
  model_type: 'IntrinsicAttribute';
  value: any;
};

export type Transition = AttributeBase & {
  model_type: 'Transition';
  destination_state_id: number;
  destination_state: {
    id: number;
    title: string;
  };
};