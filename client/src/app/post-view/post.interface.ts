export default interface PostInterface {
  title: string;
  text: string;
  author: object;
  upvotes: number;
  seenName: string;
  voters: [{}];
  createdAt: string;
}
