export default interface PostInterface {
  title: string;
  text: string;
  author: object;
  upvotes: number;
  seenId: object;
  voters: [{}];
  createdAt: string;
}
