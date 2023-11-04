interface Post {
  _id: string;
  content: string;
  image: string;
  author: User;
  createdAt: number;
  updatedAt: number;
  countComment: number;
  countLike: number;
}
