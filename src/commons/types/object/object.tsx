import { PositionType } from "../widgets/widget";
import { AttributeType } from "./attribute";

export type ObjectType = {
  attributes: AttributeType[];
  id: string;
  name: string;
  title: string;
  position: PositionType;
  order: string;
}

export type ComplementaryObjectType = {
  title?: string;
  name: string;
  logics?: {
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }
  sx?: any;
  substituteComponent?: any;
}