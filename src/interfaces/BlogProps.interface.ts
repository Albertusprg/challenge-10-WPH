export interface BlogPostProps {
  id?: string;
  title?: string;
  content?: string;
  tags?: string[];
  imageUrl?: string;
  createdAt?: string;
  likes?: number;
  comment?: number;
  author?: {
    id?: number;
    name?: string;
    email?: string;
  };
}
