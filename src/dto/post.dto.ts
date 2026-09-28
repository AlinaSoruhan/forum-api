export interface IPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface GetPostsQueryDto {
  category?: string;
  take?: string;
}
