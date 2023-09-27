interface IComment {
  _id: string;
  refId: string;
  content: string;
  createdAt: number;
  createdBy: User;
  countReply: number;
}
