export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface CreatePostDTO {
  title: string;
  content: string;
}
