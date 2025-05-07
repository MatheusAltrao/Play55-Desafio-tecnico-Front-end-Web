export interface IMessage {
  senderName: string;
  date: string;
  likes: number;
  ownMessage: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
  };
  replys?: IMessage[];
}
