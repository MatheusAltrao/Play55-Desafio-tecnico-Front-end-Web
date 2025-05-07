export interface IMessage {
  id: string;
  senderName: string;
  date: Date;
  likes: number;
  content: string;
  ownComment: boolean;
}