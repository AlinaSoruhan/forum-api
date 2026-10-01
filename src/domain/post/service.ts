import type { Post, CreatePostDTO } from './entity.js';
import type { PostRepository } from './repository.js';

export interface PostService {
  findAll(): Promise<Post[]>;
  create(dto: CreatePostDTO): Promise<Post>;
}

export function createPostService(postRepository: PostRepository): PostService {
  return {
    async findAll() {
      return postRepository.getAll();
    },
    async create(dto) {
      return postRepository.create(dto);
    },
  };
}
