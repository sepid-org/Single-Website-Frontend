import { PartyType } from "commons/types/global";

export type MessageType = {
  id: number;
  reply_to?: MessageType;
  sender: Partial<PartyType>;
  recipient: PartyType;
  title: string;
  content: string; // todo: change content to Widget
  seen: boolean;
  received_datetime: any;
  sent_datetime: string;
}

export type NotificationType = MessageType & {

}
