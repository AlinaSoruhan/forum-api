import type { Post, CreatePostDTO } from './entity.js';

export interface PostRepository {
  getAll(): Promise<Post[]>;
  create(dto: CreatePostDTO): Promise<Post>;
}

export function createPostRepository(): PostRepository {
  const posts: Post[] = []; 

  return {
    async getAll() {
      return posts;
    },
    async create(dto) {
      const newPost: Post = {
        id: Math.random().toString(36).substring(2, 9),
        title: dto.title,
        content: dto.content,
        createdAt: new Date(),
      };
      posts.push(newPost);
      return newPost;
    },
  };
}
