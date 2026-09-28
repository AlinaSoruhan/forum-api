import { postRepository } from '../repositories/post.js';
import type { IPost, CreatePostDto } from '../dto/post.dto.js';

export const postService = {
  getPosts(category?: string, take?: number): IPost[] {
    return postRepository.getAll(category, take);
  },

  getPostById(id: number): IPost | undefined {
    return postRepository.getById(id);
  },

  async createPost(postData: CreatePostDto): Promise<IPost> {
    return await postRepository.addPost(postData);
  }
};
